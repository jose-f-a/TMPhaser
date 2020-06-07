var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var configGame = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // width: gameWidth,
        // height: gameHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


const pipeWidth = 52;
var game = new Phaser.Game(configGame);

var isPaused = false,
    gameOver = false;
var score = 0;
var birdyX = (gameWidth/2)-50;
var birdyY = (gameHeight/2)-50;

function preload ()
{
    this.load.image('sky', 'assets/fundo.png');
    // this.load.image('star', 'assets/star.png');
    this.load.image('pipeb', 'assets/pipeb.png');
    this.load.image('pipet', 'assets/pipet.png');
    this.load.spritesheet('birdy',
        'assets/jogador.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    this.load.audio('flap', './assets/sounds/jump.wav');
    this.load.audio('hit', './assets/sounds/sfx_hit.ogg');
    this.load.audio('die', './assets/sounds/die.wav');
    this.load.audio('score', './assets/sounds/score.wav');
}
var platforms,spacebar,player,scoreText;
var gap = 220;  //gap onde o player tem de passar
var xGap = 550; //gap entre obstaculos
var music;

function create ()
{
    // this.add.image(400, 300, 'sky');
    var colors = ["0x1fbde0","0x0a4957","0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor)



    // this.physics.world.setBoundsCollision(true, true, true, false);

    //Add score text
    scoreText = this.add.text(birdyX, (gameHeight/4),score,{ fontFamily: '"04b19"', fontSize: 60, color: '#fff' });

    platforms = this.physics.add.staticGroup();
    var pipePos = gameWidth+1.2*xGap
    // Cria as platforms de forma random, em tempos de altura
    let pos = getRandom();

    platforms.create(pipePos, pos[0], 'pipeb').setScale(1).refreshBody();
    platforms.create(pipePos, pos[1], 'pipet').setScale(1).refreshBody();

    player = this.physics.add.sprite(birdyX, birdyY, 'birdy');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'flap',
        frames: this.anims.generateFrameNumbers('birdy', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: 0
    });

    player.body.setGravityY(300)

    //Sempre que "toca" nas plataformas executa o playerHit
    this.physics.add.collider(player, platforms, playerHit, null, game)

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.keyboard.on('keydown-' + 'SPACE', flapNow);
    this.input.on('pointerdown', flapNow); //touch support


    //Para colocar em pausa;


    //Para voltar;



}

function getRandom() {
    let safePadding = 25;
    let min = Math.ceil(safePadding+gap/2);
    let max = Math.floor(game.canvas.height-safePadding-gap/2);
    let ran =  Math.floor(Math.random() * (max - min + 1)) + min;
    let rantop = ran-((gap/2)+260);
    let ranbot = ran+((gap/2)+260);

    return [ranbot, rantop]
}

var countpipe = 0;

function update ()
{


    //Vamos aumentar a dificuldade ao longo do jogo
    if(score==10){
        gap = 200;  //gap onde o player tem de passar
        xGap = 520;
    }

    if(score==20){
        gap = 185;  //gap onde o player tem de passar
        xGap = 480;
    }

    if(score==25){
        gap = 170;  //gap onde o player tem de passar
        xGap = 420;
    }

    if(score==30){
        gap = 155;  //gap onde o player tem de passar
        xGap = 345;
    }



    let children = platforms.getChildren();
    //Vai percorrer as plataformas, para ir criado mais
    children.forEach((child) => {
        if (child instanceof Phaser.GameObjects.Sprite) {
            child.refreshBody();
            child.x += -3;

            //when one set of pipe is just shown

            if(child.x <= gameWidth && !child.drawn) {
                countpipe+=1;
                child.drawn=true;

                if(countpipe>=2) {
                    let pos = getRandom();

                    platforms.create(gameWidth+xGap, pos[0], 'pipeb').setScale(1).refreshBody();
                    platforms.create(gameWidth+xGap, pos[1], 'pipet').setScale(1).refreshBody();
                    countpipe=0;

                }
            }

            //Se o pipe estiver fora do ecra vai remover

            if(child.x <= -50) {

                child.destroy();
            }

           //Verifica se o player passou pelo obstaculo
            if(child.x< birdyX && !gameOver && child.texture.key=="pipeb" && !child.scored){
                child.scored = true
                score+=1;
                scoreText.setText(score)
                game.sound.play("score");

            }
        }
    });

    if(gameOver){
        player.y = 450;
        player.x = 850;
        scoreText.x = 850;

        endGame();
    }
}

function flapNow(){
    if(gameOver) return;
    //if(isPaused) resume();
    player.setVelocityY(-330);
    game.sound.play("flap");
}
//hit flag serve para depois de dar hit a primeira vez nao dar mais nenhuma
var hitflag = false;

//Vai ser corrido sempre que colidir
function playerHit() {
    if(hitflag) return
   game.sound.play("hit");
    hitflag=true;
    //executa o playerDead com delay
    setTimeout(playerDead, 200)
}

//vai ser executado depois de colidir,atravez do playerhit

function playerDead() {
    game.sound.play("die");
    player.setCollideWorldBounds(false);
    //Coloca o gameOver true, para depois ser executado o endGame
    gameOver =  true;
}

//Quando o player morre

function endGame() {

    //Aqui falta por pa abrir uma nova scene para dar restar
    //So que nao estou a conseguir
    //Ele antes parava porque dava erro.

}




