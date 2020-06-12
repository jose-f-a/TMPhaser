class SceneInicial extends Phaser.Scene {
  constructor() {
    super({ key: "inicio" });
  }

  preload() {
    this.load.image("startMario", "assets/flappyMario.png");
    this.load.image("startPedgrey", "assets/pedgreyVieimir.png");
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

    /** 
     * ! Não funciona...
    var btnStart = new FlatButton({
      scene: this,
      key: "comecar",
      text: "start",
      event: "start_game",
    });

    emitter.on("start_game", this.startGame, this);
    */

    //  Só aparece o segundo
   this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 4, "startMario")
      .setInteractive()
        .on("pointerdown", function () {
          gameMain.scene.start("start");
          gameMain.scene.stop("inicio");
        });

    this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "startPedgrey")
      .setInteractive()
        .on("pointerdown", function () {
      gameMain.scene.start("start2");
      gameMain.scene.stop("inicio");
    });

    /*  Texto comentado
    this.add
      .text(100, 100, "Flappy Mario", { fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start");
        gameMain.scene.stop("inicio");
      });

    this.add
      .text(100, 200, 'Pedgrey "Flappy" Vieimir', { fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", function () {
        gameMain.scene.start("start2");
        gameMain.scene.stop("inicio");
      });
      */
  }

  /**
   * ! Não funciona
  startGame() {
    this.scene.start("SceneStart");
  }
   */
}
