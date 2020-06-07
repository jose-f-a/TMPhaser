
var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
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
            gravity: { y: 55 },
            debug: false
        }
    },
    scene: [SceneGame]
};


var game = new Phaser.Game(config);




