var gameMainWidth = 1536;
var gameMainHeight = 722;

var config = {
  type: Phaser.AUTO,
  width: gameMainWidth,
  height: gameMainHeight,
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: gameWidth,
    // height: gameHeight
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: [
    SceneInicial,
    SceneStart,
    SceneGame,
    SceneGameOver,
    SceneStart2,
    SceneGame2,
    SceneGameOver2,
  ],
};

var gameMain = new Phaser.Game(config);
