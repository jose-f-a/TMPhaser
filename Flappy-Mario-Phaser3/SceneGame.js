
class SceneGame extends Phaser.Scene{

    //Variaveis
    isPaused = false;
    gameOver = false;
    score = 0;
    birdyX = (gameMainWidth/2)-50;
    birdyY = (gameMainHeight/2)-50;

    platforms;
    spacebar;
    player;
    scoreText;
    gap = 220;  //gap onde o player tem de passar
    xGap = 550; //gap entre obstaculos
    music;

    countpipe = 0;

    //hit flag serve para depois de dar hit a primeira vez nao dar mais nenhuma
    hitflag = false;

    constructor() {
        super({key:'jogo'});
    }

    init(){

    };

    preload () {
        this.load.image('sky', 'assets/fundo.png');
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

    create() {
        // this.add.image(400, 300, 'sky');
        var colors = ["0x1fbde0","0x0a4957","0x08272e"];
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        this.cameras.main.setBackgroundColor(randColor);

        //Add score text
        this.scoreText = this.add.text(this.birdyX, (gameMainHeight/4),this.score,{ fontFamily: '"04b19"', fontSize: 60, color: '#fff' });

        this.platforms = this.physics.add.staticGroup();
        var pipePos = gameMainWidth+1.2*this.xGap;
        // Cria as platforms de forma random, em tempos de altura
        let pos = this.getRandom();

        this.platforms.create(pipePos, pos[0], 'pipeb').setScale(1).refreshBody();
        this.platforms.create(pipePos, pos[1], 'pipet').setScale(1).refreshBody();

        this.player = this.physics.add.sprite(this.birdyX,this.birdyY, 'birdy');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        gameMain.anims.create({
            key: 'flap',
            frames: gameMain.anims.generateFrameNumbers('birdy', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: 0
        });

        this.player.body.setGravityY(300);

        //Sempre que "toca" nas plataformas executa o playerHit

        this.physics.add.collider(this.player, this.platforms, this.playerHit, null, gameMain);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown-' + 'SPACE', this.flapNow);

        this.input.on('pointerdown', this.flapNow); //touch support
    }
    update() {

        //Vamos aumentar a dificuldade ao longo do jogo
        if(this.score==10){
            this.gap = 200;  //gap onde o player tem de passar
            this.xGap = 520;
        }

        if(this.score==20){
            this.gap = 185;  //gap onde o player tem de passar
            this.xGap = 480;
        }

        if(this.score==25){
            this.gap = 170;  //gap onde o player tem de passar
            this.xGap = 420;
        }

        if(this.score==30){
            this.gap = 155;  //gap onde o player tem de passar
            this.xGap = 345;
        }



        let children = this.platforms.getChildren();
        //Vai percorrer as plataformas, para ir criado mais

        children.forEach((child) => {
            if (child instanceof Phaser.GameObjects.Sprite) {
                child.refreshBody();
                child.x += -3;

                //when one set of pipe is just shown

                if(child.x <= gameMainWidth && !child.drawn) {
                    this.countpipe+=1;
                    child.drawn=true;

                    if(this.countpipe>=2) {
                        let pos = this.getRandom();

                        this.platforms.create(gameMainWidth+this.xGap, pos[0], 'pipeb').setScale(1).refreshBody();
                        this.platforms.create(gameMainWidth+this.xGap, pos[1], 'pipet').setScale(1).refreshBody();
                        this.countpipe=0;

                    }
                }

                //Se o pipe estiver fora do ecra vai remover

                if(child.x <= -50) {
                    child.destroy();
                }

                //Verifica se o player passou pelo obstaculo
                if(child.x< this.birdyX && !this.gameOver && child.texture.key=="pipeb" && !child.scored){
                    child.scored = true;
                    this.score+=1;
                    this.scoreText.setText(this.score);
                    gameMain.sound.play("score");

                }
            }
        });

        if(this.gameOver){
            this.player.y = 450;
            this.player.x = 850;
            this.scoreText.x = 850;

            //this.endGame();
        }
    }

    getRandom() {

        let safePadding = 25;
        let min = Math.ceil(safePadding+this.gap/2);
        let max = Math.floor(gameMain.canvas.height-safePadding-this.gap/2);
        let ran =  Math.floor(Math.random() * (max - min + 1)) + min;
        let rantop = ran-((this.gap/2)+260); //Tubo de cima
        let ranbot = ran+((this.gap/2)+260); //Tubo de baixo

        return [ranbot, rantop]
    }

    flapNow(){
        if(this.gameOver) return;
        if(isPaused) resume();
        this.player.setVelocityY(-330);
        gameMain.sound.play("flap");
    }

    playerHit() {
        if(this.hitflag) return;
        gameMain.sound.play("hit");
        this.hitflag=true;
        //executa o playerDead com delay
        this.setTimeout(this.playerDead, 200);

    }

    //Depois de dar hit, nao me executa esta função
    playerDead() {
        gameMain.sound.play("die");
        this.player.setCollideWorldBounds(false);
        //Coloca o gameOver true, para depois ser executado o endGame
        this.gameOver =  true;
    }




}
