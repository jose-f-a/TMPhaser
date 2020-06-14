class SceneInicial extends Phaser.Scene {
  constructor() {
    super({ key: "inicio" });
  }

  preload() {
    this.load.audio("fundoMario", "./assets/sounds/FlappyBack.ogg");
    this.load.audio("fundoVi", "./assets/sounds/FlappyBack2.ogg");
    this.load.image("inicial", "assets/inicial.png");
    this.load.image("startMario", "assets/flappyMario.png");
    this.load.image("startPedgrey", "assets/pedgreyVieimir.png");
  }

  create() {
    //  Cor de fundo caso não carrega a imagem
    var colors = ["3BB6FA"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    this.add.image(768, 361, "inicial");
    var scene1 = this;

    //  Botao para o jogo do Mario
    var mario = this.add
      .sprite(675, 335, "startMario")
      .setInteractive()
      .on("pointerdown", function () {
        scene1.time.addEvent({
          delay: 0,
          callback: () => {
            scene1.cameras.main.fade(500);
            setTimeout(function () {
              gameMain.scene.start("start");
              gameMain.scene.stop("inicio");
            }, 500);
          },
          callbackScope: scene1,
        });
      });

    //  Botao para o jogo do Vieira
    var vieira = this.add
      .sprite(675, 450, "startPedgrey")
      .setInteractive()
      .on("pointerdown", function () {
        scene1.time.addEvent({
          delay: 0,
          callback: () => {
            scene1.cameras.main.fade(500);
            setTimeout(function () {
              gameMain.scene.start("start2");
              gameMain.scene.stop("inicio");
            }, 500);
          },
          callbackScope: scene1,
        });
      });

    //  Opacidade dos botoes
    mario.alpha = 0.65;
    vieira.alpha = 0.65;
    mario.on("pointerover", function () {
      mario.alpha = 1;
    });
    mario.on("pointerout", function () {
      mario.alpha = 0.65;
    });

    vieira.on("pointerover", function () {
      vieira.alpha = 1;
    });
    vieira.on("pointerout", function () {
      vieira.alpha = 0.65;
    });
  }
}
