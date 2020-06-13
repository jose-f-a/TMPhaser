class SceneInicial extends Phaser.Scene {
  constructor() {
    super({ key: "inicio" });
  }

  preload() {
    this.load.image("inicial", "assets/inicial.png");
    this.load.image("startMario", "assets/flappyMario.png");
    this.load.image("startPedgrey", "assets/pedgreyVieimir.png");
  }

  create() {
    var colors = ["3BB6FA"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    this.add.image(768, 361, "inicial");

    var mario = this.add
      .sprite(675, 335, "startMario")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start");
        gameMain.scene.stop("inicio");
      });
    mario.alpha = 0.85;
    mario.on("pointerover", function () {
      mario.alpha = 1;
    });
    mario.on("pointerout", function () {
      mario.alpha = 0.85;
    });

    var vieira = this.add
      .sprite(675, 450, "startPedgrey")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start2");
        gameMain.scene.stop("inicio");
      });
    vieira.alpha = 0.85;
    vieira.on("pointerover", function () {
      vieira.alpha = 1;
    });
    vieira.on("pointerout", function () {
      vieira.alpha = 0.85;
    });
  }
}
