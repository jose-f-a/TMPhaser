class SceneInicial extends Phaser.Scene {


    constructor() {
        super({key: 'inicio'});
    }

    preload() {
        //game.load.spritesheet("comecar", "assets/play.png", 180, 180);
        this.load.image('sky', 'assets/fundo.png');
        this.load.image('pipeb', 'assets/pipeb.png');
        this.load.image('pipet', 'assets/pipet.png');
        this.load.spritesheet('birdy',
            'assets/jogador.png',
            {frameWidth: 48, frameHeight: 48}
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

        this.add.text(100, 100, 'Flappy Mario', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', function () {
                gameMain.scene.start('start');
                gameMain.scene.stop('inicio');
            } );

        this.add.text(100, 200, 'Pedrgey "Flappy" Vieirimir', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', function () {
                gameMain.scene.start('start2');
                gameMain.scene.stop('inicio');
            } );

    }
}