class SceneInicial extends Phaser.Scene {
  constructor() {
    super({ key: "inicio" });
  }

  preload() {
    this.load.image("startMario", "assets/flappyMario.png");
    this.load.image("startPedgrey", "assets/pedgreyVieimir.png");
  }

  create() {
    var colors = ["0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    //  Só aparece o segundo
    this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 4, "startMario")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start");
        gameMain.scene.stop("inicio");
      });

    this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, "startPedgrey")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start2");
        gameMain.scene.stop("inicio");
      });
  }
}
