class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "end" });
    this.pontos;
  }
  init(data) {
    console.log("init", data);

    this.pontos = data;
  }
  preload() {}

  create() {
    var colors = ["0x0a4957", "0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    this.add.text(
      window.innerWidth / 2,
      window.innerHeight / 5,
      "SCORE: " + this.pontos,
      {
        fontFamily: '"04b19',
        fontSize: "36px",
        fill: "#FFF",
      }
    );

    const clickButton1 = this.add
      .text(100, 100, "Voltar a tentar", { fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start");
        gameMain.scene.stop("end");
      });

    const clickButton2 = this.add
      .text(100, 200, "Mudar de nivel", { fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("inicio");
        gameMain.scene.stop("end");
        gameMain.scene.stop("start");
      });
  }
  update() {}
}
