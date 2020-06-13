class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "end" });
    this.pontos;
  }
  init(data) {
    console.log("init", data);

    this.pontos = data;
  }
  preload() {
    this.load.image("final", "assets/gameOver.png");
    this.load.image("tryAgain", "assets/tryAgain.png");
    this.load.image("mainMenu", "assets/mainMenu.png");
  }

  create() {
    var colors = ["0x0a4957", "0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    this.add.image(768, 361, "final");

    this.add.text(675, window.innerHeight / 2, "SCORE: " + this.pontos, {
      fontFamily: '"04b19',
      fontSize: "36px",
      fill: "#FFF",
    });

    var tryAgain = this.add
      .sprite(750, 250, "tryAgain")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start");
        gameMain.scene.stop("end");
      });
    tryAgain.alpha = 0.85;
    tryAgain.on("pointerover", function () {
      tryAgain.alpha = 1;
    });
    tryAgain.on("pointerout", function () {
      tryAgain.alpha = 0.85;
    });

    var mainMenu = this.add
      .sprite(750, 400, "mainMenu")
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("inicio");
        gameMain.scene.stop("end");
      });
    mainMenu.alpha = 0.85;
    mainMenu.on("pointerover", function () {
      mainMenu.alpha = 1;
    });
    mainMenu.on("pointerout", function () {
      mainMenu.alpha = 0.85;
    });
  }

  update() {}
}
