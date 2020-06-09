class SceneStart extends Phaser.Scene {

    /*
    PROBLEMA, NAO SEI PORQUE MAS NAO CONSIGO ALTERAR O VALOR DO GAME OVER
     */

    constructor() {
        super({key: 'start'});

    }

    preload() {
        this.load.image('sky', 'assets/fundo.png');
        this.load.image('pipeb', 'assets/pipeb.png');
        this.load.image('pipet', 'assets/pipet.png');
        this.load.spritesheet('birdy',
            'assets/jogador.png',
            {frameWidth: 64, frameHeight: 64}
        );

        this.load.audio('flap', './assets/sounds/jump.wav');
        this.load.audio('hit', './assets/sounds/sfx_hit.ogg');
        this.load.audio('die', './assets/sounds/die.wav');
        this.load.audio('score', './assets/sounds/score.wav');
    }

    create(){
        var colors = ["0x1fbde0","0x0a4957","0x08272e"];
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        this.cameras.main.setBackgroundColor(randColor);

        //Add score text
        this.scoreText = "0";
        this.player = this.add.sprite(this.birdyX,this.birdyY, 'birdy');
        this.player.y = 450;
        this.player.x = 850;
        this.input.on('pointerdown', function () {
            gameMain.scene.pause('start');
            gameMain.scene.start('jogo');
        },this); //touch support

    }


}
