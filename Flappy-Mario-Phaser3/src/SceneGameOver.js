class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({key: 'end'});
    }

    preload(){
        
    }

    create(){
        var colors = ["0x1fbde0","0x0a4957","0x08272e"];
        var randColor = colors[Math.floor(Math.random() * colors.length)];
        this.cameras.main.setBackgroundColor(randColor);

        this.input.on('pointerdown', function () {
            gameMain.scene.pause('jogo');
            gameMain.scene.start('end');
        },this); //touch support
    }
    update(){

    }
}