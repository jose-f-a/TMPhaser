class SceneStart2 extends Phaser.Scene {


    constructor() {
        super({key: 'start2'});
    }

    preload() {

        this.load.spritesheet('vi',
            'assets/vi.png',
            {frameWidth: 48, frameHeight: 48}
        );


    }

    create(){
        var colors = ["0x1fbde0","0x0a4957","0x08272e"];
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        this.cameras.main.setBackgroundColor(randColor);
        this.add.text(16, 16, 'Press too play', { fontSize: '32px', fill: '#000' });
        // Botao para começar
        //var btnPlay = game.add.button(game.world.centerX, 200, "buttons", this.clickMe, this, 0, 1, 0);

        // Adiciona o texto de pontuaçao
        this.scoreText = "0";
        this.player = this.add.sprite(this.birdyX,this.birdyY, 'vi');
        this.player.x= 740;
        this.player.y =350;

        this.input.on('pointerdown', function () {
            gameMain.scene.start('jogo2');
            gameMain.scene.pause('start2');
        },this); // Touch support
    }
}