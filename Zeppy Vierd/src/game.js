//* Configurações do jogo
var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//* Configurações 
const largCano = 50;
var pausado = false;
var gameOver = false;
var score = 0;
var marioX = (gameWidth/2)-50;
var marioY = (gameHeight/2)-50;

 
var game = new Phaser.Game(config);

function preload() {
    //  Fundo
    this.load.image('fundo', 'assets/fundo.png');
    //  Tubos
    this.load.image('tuboBaixo', 'assets/pipe-green-bottom.png');
    this.load.image('tuboTop', 'assets/pipe-green-top.png');
    //  Player
    this.load.spritesheet('mario', 'assets/jogador.png', { frameWidth: 64, frameHeight: 64 });

    /** Audio
    this.load.audio('salto', './assets/sounds/sfx_wing.ogg');
    this.load.audio('hit', './assets/sounds/sfx_hit.ogg');
    this.load.audio('die', './assets/sounds/sfx_die.ogg');
    this.load.audio('score', './assets/sounds/sfx_point.ogg');
    */ 
}

var platforms,spacebar,player,scoreText;
var gap = 150;
var xGap = 250;

function create() {
    //Add score text
    scoreText = this.add.text(birdyX, (gameHeight/4),score,{fontSize: 60, color: '#fff' });

    platforms = this.physics.add.staticGroup();
    var pipePos = gameWidth+2*xGap
    let pos = getRandom();
    // bottom placable at 260+gap to height
    platforms.create(pipePos, pos[0], 'pipeb').setScale(1).refreshBody();
    platforms.create(pipePos, pos[1], 'pipet').setScale(1).refreshBody();


    
}

function update() {

}