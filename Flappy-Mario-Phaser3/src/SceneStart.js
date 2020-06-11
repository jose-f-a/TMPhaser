class SceneStart extends Phaser.Scene {
  constructor() {
    super({ key: "start" });
  }

  preload() {
    //game.load.spritesheet("comecar", "assets/play.png", 180, 180);
    this.load.image("sky", "assets/fundo.png");
    this.load.image("pipeb", "assets/pipeb.png");
    this.load.image("pipet", "assets/pipet.png");
    this.load.spritesheet("birdy", "assets/jogador.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.audio("flap", "./assets/sounds/jump.wav");
    this.load.audio("hit", "./assets/sounds/sfx_hit.ogg");
    this.load.audio("die", "./assets/sounds/die.wav");
    this.load.audio("score", "./assets/sounds/score.wav");
  }

  create() {
    var colors = ["0x0a4957", "0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);
    this.add.text(16, 16, "Press too play", { fontSize: "32px", fill: "#000" });
    // Botao para começar
    //var btnPlay = game.add.button(game.world.centerX, 200, "buttons", this.clickMe, this, 0, 1, 0);

    // Adiciona o texto de pontuaçao
    this.scoreText = "0";
    this.player = this.add.sprite(this.birdyX, this.birdyY, "birdy");
    this.player.x = 740;
    this.player.y = 350;

    this.input.on(
      "pointerdown",
      function () {
        gameMain.scene.start("jogo");
        gameMain.scene.pause("start");
      },
      this
    ); // Touch support
  }
}
