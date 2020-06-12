var gameOver = false;
var hitflag = false;
var score = 0;
var dieFlag;
class SceneGame extends Phaser.Scene {
  /**
   *! PROBLEMA, NAO SEI PORQUE MAS NAO CONSIGO ALTERAR O VALOR DO GAME OVER
   */

  constructor() {
    super({ key: "jogo" });

    //Variaveis
    this.birdyX = gameMainWidth / 2 - 50;
    this.birdyY = gameMainHeight / 2 - 50;
    this.gameOver = false;
    this.platforms;
    this.nuvens;
    this.spacebar;
    this.player;
    this.scoreText;
    this.gap = 220; //gap onde o player tem de passar
    this.xGap = 550; //gap entre obstaculos
    this.music;
    this.speed = 10;
    this.fall = 300;
    this.countpipe = 0;
    this.countNuv = 0;

    //hit flag serve para depois de dar hit a primeira vez nao dar mais nenhuma
    this.hitflag = false;
  }
  preload() {
    this.load.image("sky", "assets/fundo.png");
    this.load.image("pipeb", "assets/pipeb.png");
    this.load.image("pipet", "assets/pipet.png");
    this.load.image("nuvem", "assets/nuvem.png");
    this.load.spritesheet("birdy", "assets/jogador.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.audio("flap", "./assets/sounds/jump.wav");
    this.load.audio("flapSuper", "./assets/sounds/jump-super.wav");
    this.load.audio("flapSuperReverse", "assets/sounds/jump-super-reverse.wav");
    this.load.audio("hit", "./assets/sounds/sfx_hit.ogg");
    this.load.audio("die", "./assets/sounds/die.wav");
    this.load.audio("score", "./assets/sounds/score.wav");
  }

  create() {
    dieFlag = true;
    gameOver = false;
    hitflag = false;
    score = 0;
    this.speed = 5;
    this.fall = 300;

    var colors = ["0x0a4957"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    //Add score text
    this.scoreText = this.add.text(this.birdyX, gameMainHeight / 4, score, {
      fontFamily: '"04b19"',
      fontSize: 60,
      color: "#fff",
    });

    this.nuvens = this.physics.add.staticGroup();
    this.platforms = this.physics.add.staticGroup();

    var pipePos = gameMainWidth + 1.2 * this.xGap;
    // Cria as platforms de forma random, em tempos de altura
    let pos = this.getRandom();

    this.nuvens
      .create(gameMainWidth + 400, 50, "nuvem")
      .setScale(1)
      .refreshBody();
    this.nuvens.create(gameMainWidth, 85, "nuvem").setScale(1).refreshBody();
    this.nuvens
      .create(gameMainWidth + 265, 150, "nuvem")
      .setScale(1)
      .refreshBody();

    this.player = this.physics.add.sprite(this.birdyX, this.birdyY, "birdy");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.platforms
      .create(gameMainWidth, pos[0], "pipeb")
      .setScale(1)
      .refreshBody();
    this.platforms
      .create(gameMainWidth, pos[1], "pipet")
      .setScale(1)
      .refreshBody();

    gameMain.anims.create({
      key: "flap",
      frames: gameMain.anims.generateFrameNumbers("birdy", {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.player.body.setGravityY(this.fall);

    //Sempre que "toca" nas plataformas executa o playerHit
    this.physics.add.collider(
      this.player,
      this.platforms,
      this.playerHit,
      null,
      gameMain
    );

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.input.keyboard.on("keydown-" + "W", this.flapNowBoostUp, this);
    this.input.keyboard.on("keydown-" + "S", this.flapNowBoostDown, this);
    this.input.keyboard.on("keydown-" + "SPACE", this.flapNowMouse, this);
    this.input.on("pointerdown", this.flapNowMouse, this); //touch support
    this.scoreText.setVisible(false);
  }

  update() {
    if (score > 0) {
      this.scoreText.setVisible(true);
    }

    if (gameOver) {
      this.scoreText.x = 850;

      if (dieFlag) {
        this.sound.play("die");

        this.time.addEvent({
          delay: 0,
          callback: () => {
            this.cameras.main.fade(800);
            setTimeout(function () {
              gameMain.scene.stop("jogo");
              gameMain.scene.start("end", score.toString());
            }, 2250);
          },
          callbackScope: this,
        });

        dieFlag = false;
      }

      return;
    }

    //Vamos aumentar a dificuldade ao longo do jogo
    if (score === 10) {
      this.speed = 10;
      this.fall = 330;
    }
    if (score === 15) {
      this.speed = 8;
      this.fall = 330;
    }
    if (score === 20) {
      this.speed = 9;
      this.fall = 363;
    }
    if (score === 25) {
      this.speed = 10;
      this.fall = 363;
    }
    if (score === 30) {
      this.speed = 12;
      this.fall = 399;
    }
    if (score === 40) {
      this.speed = 15;
      this.fall = 439;
    }

    console.log("Speed: " + this.speed);

    let children = this.platforms.getChildren();
    let nuvensChi = this.nuvens.getChildren();

    //Vai percorrer as plataformas, para ir criado mais
    children.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
        child.refreshBody();
        child.x -= this.speed;

        //when one set of pipe is just shown
        if (child.x <= gameMainWidth && !child.drawn) {
          this.countpipe += 1;
          child.drawn = true;

          if (this.countpipe >= 2) {
            let pos = this.getRandom();
            this.platforms
              .create(gameMainWidth + this.xGap, pos[0], "pipeb")
              .setScale(1)
              .refreshBody();
            this.platforms
              .create(gameMainWidth + this.xGap, pos[1], "pipet")
              .setScale(1)
              .refreshBody();
            this.countpipe = 0;
          }
        }

        if (child.x <= gameMainWidth && !child.drawn) {
          this.count += 1;
          child.drawn = true;
        }

        //Se o pipe estiver fora do ecra vai remover
        if (child.x <= -50) {
          child.destroy();
        }

        //Verifica se o player passou pelo obstaculo
        if (
          child.x < this.birdyX &&
          !this.gameOver &&
          child.texture.key == "pipeb" &&
          !child.scored
        ) {
          child.scored = true;
          score += 1;
          this.scoreText.setText(score);
          gameMain.sound.play("score");
        }
      }
    });

    nuvensChi.forEach((childNuv) => {
      if (childNuv instanceof Phaser.GameObjects.Sprite) {
        childNuv.refreshBody();
        childNuv.x -= this.speed - 2.25;
        this.countNuv = nuvensChi.length;

        console.log("Inicio" + this.countNuv);

        /*
        if (this.countNuv <= 3) {
          console.log("AQUI 3");
          this.nuvens
            .create(gameMainWidth + 400, 50, "nuvem")
            .setScale(1)
            .refreshBody();
          this.nuvens
            .create(gameMainWidth, 85, "nuvem")
            .setScale(1)
            .refreshBody();
          this.nuvens
            .create(gameMainWidth + 265, 150, "nuvem")
            .setScale(1)
            .refreshBody();
          this.countNuv = 0;
        }

        if (childNuv.x <= gameMainWidth && !childNuv.drawn) {
          this.countNuv += 1;
          childNuv.drawn = true;
        }
        */

        //Se o nuvem estiver fora do ecra vai remover
        if (childNuv.x <= -50) {
          childNuv.x = gameMainWidth;
        }
      }
    });
  }

  getRandom() {
    let safePadding = 25;
    let min = Math.ceil(safePadding + this.gap / 2);
    let max = Math.floor(gameMain.canvas.height - safePadding - this.gap / 2);
    let ran = Math.floor(Math.random() * (max - min + 1)) + min;
    let rantop = ran - (this.gap / 2 + 260); //Tubo de cima
    let ranbot = ran + (this.gap / 2 + 260); //Tubo de baixo

    return [ranbot, rantop];
  }

  //Funções quando um input é feito
  flapNowMouse() {
    if (this.gameOver) return;
    this.player.setVelocityY(-330);
    this.sound.play("flap");
  }
  flapNowBoostUp() {
    if (this.gameOver) return;
    this.player.setVelocityY(-600);
    this.sound.play("flapSuper");
  }

  flapNowBoostDown() {
    if (this.gameOver) return;
    this.player.setVelocityY(600);
    this.sound.play("flapSuperReverse");
  }

  playerHit() {
    if (hitflag) return;
    this.sound.play("hit");
    hitflag = true;
    gameOver = true;
  }
}
