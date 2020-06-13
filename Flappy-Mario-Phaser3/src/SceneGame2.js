var gameOver = false;
var hitflag = false;
var score = 0;
var dieFlag;
var back;
class SceneGame2 extends Phaser.Scene {

  constructor() {
    super({ key: "jogo2" });

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
    this.speed = 5;
    this.fall = 300;
    this.countpipe = 0;
    this.countNuv = 0;

    //hit flag serve para depois de dar hit a primeira vez nao dar mais nenhuma
    this.hitflag = false;
  }
  preload() {
    this.load.image("jogo", "assets/jogo.png");
    this.load.image("baixo", "assets/baixo.png");
    this.load.image("cima", "assets/cima.png");
    this.load.image("nuvem", "assets/nuvem.png");
    this.load.spritesheet("vi", "assets/vi.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.audio("flap", "./assets/sounds/jump.ogg");
    this.load.audio("flapSuper", "./assets/sounds/jump-super.ogg");
    this.load.audio("flapSuperReverse", "assets/sounds/jump-super-reverse.ogg");
    this.load.audio("hit", "./assets/sounds/sfx_hit.ogg");
    this.load.audio("die", "./assets/sounds/die.wav");
    this.load.audio("score", "./assets/sounds/score.ogg");
  }

  create() {
    dieFlag = true;
    gameOver = false;
    hitflag = false;
    score = 0;
    this.speed = 7;
    this.fall = 300;

    back = this.sound.add("fundoVi");
    back.play();
    this.add.image(768, 361, "jogo");

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

    this.player = this.physics.add.sprite(this.birdyX, this.birdyY, "vi");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.platforms
        .create(gameMainWidth, pos[0], "baixo")
        .setScale(1)
        .refreshBody();
    this.platforms
        .create(gameMainWidth, pos[1], "cima")
        .setScale(1)
        .refreshBody();

    gameMain.anims.create({
      key: "flap",
      frames: gameMain.anims.generateFrameNumbers("vi", {
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


  }

  update() {


    if (gameOver) {
      this.scoreText.x = 850;
      back.stop();
      if (dieFlag) {
        this.sound.play("die");
        this.player.rotation += -2;
        this.time.addEvent({
          delay: 0,
          callback: () => {
            this.cameras.main.fade(2000);
            setTimeout(function () {
              gameMain.scene.stop("jogo2");
              gameMain.scene.start("end2", score.toString());
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
      this.speed = 9;
      this.fall = 330;
      back.setRate(1.1);
    }

    if (score === 20) {
      this.speed = 12;
      this.fall = 363;
      back.setRate(1.2);
    }

    if (score === 30) {
      this.speed = 15;
      this.fall = 399;
      back.setRate(1.3);
    }
    if (score === 40) {
      this.speed = 17;
      this.fall = 439;
      back.setRate(1.4);
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
                .create(gameMainWidth + this.xGap, pos[0], "baixo")
                .setScale(1)
                .refreshBody();
            this.platforms
                .create(gameMainWidth + this.xGap, pos[1], "cima")
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
            child.texture.key == "baixo" &&
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
    if (gameOver) return;
    this.player.setVelocityY(-330);
    this.sound.play("flap");
  }
  flapNowBoostUp() {
    if (gameOver) return;
    this.player.setVelocityY(-600);
    this.sound.play("flapSuper");
  }

  flapNowBoostDown() {
    if (gameOver) return;
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
