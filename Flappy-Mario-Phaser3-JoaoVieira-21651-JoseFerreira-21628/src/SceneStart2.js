class SceneStart2 extends Phaser.Scene {
  constructor() {
    super({ key: "start2" });
  }

  preload() {
    //  Carrega o fundo e o jogador
    this.load.image("fundo", "assets/start.png");

    this.load.spritesheet("vi", "assets/vi.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    //  Cria o fundo
    this.add.image(768, 361, "fundo");

    //  Adiciona os textos de informação de como jogar
    this.add.text(600, window.innerHeight / 5, "PRESS JUMP TO PLAY", {
      fontFamily: '"04b19',
      fontSize: "32px",
      color: "#fff",
    });

    this.add.text(130, 50, "BOOST UP", {
      fontFamily: '"04b19',
      fontSize: "25px",
      color: "#fff",
    });

    this.add.text(130, 110, "BOOST DOWN", {
      fontFamily: '"04b19',
      fontSize: "25px",
      color: "#fff",
    });

    this.add.text(130, 170, "JUMP", {
      fontFamily: '"04b19',
      fontSize: "25px",
      color: "#fff",
    });

    //  Adiciona o texto de pontuaçao
    this.scoreText = "0";
    this.player = this.add.sprite(this.birdyX, this.birdyY, "vi");
    this.player.x = 740;
    this.player.y = 350;
    this.player.setScale(1.25,1.25);
    this.input.keyboard.on(
      "keydown-" + "W",
      function () {
        gameMain.scene.start("jogo2");
        gameMain.scene.pause("start2");
      },
      this
    );
    this.input.keyboard.on(
      "keydown-" + "S",
      function () {
        gameMain.scene.start("jogo2");
        gameMain.scene.pause("start2");
      },
      this
    );
    this.input.keyboard.on(
      "keydown-" + "SPACE",
      function () {
        gameMain.scene.start("jogo2");
        gameMain.scene.pause("start2");
      },
      this
    );
  }
}
