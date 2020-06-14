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
    this.gap = 220; //  Gap onde o player tem de passar
    this.xGap = 550; //  Gap entre obstaculos
    this.music;
    this.speed = 11;
    this.fall = 300;
    this.countpipe = 0;
    this.countNuv = 0;

    //  hitflag serve para depois de dar hit a primeira vez nao dar mais nenhuma
    this.hitflag = false;
  }
  preload() {
    //  Load de imagens
    this.load.image("jogo", "assets/jogo.png");
    this.load.image("baixo", "assets/baixo.png");
    this.load.image("cima", "assets/cima.png");
    this.load.image("nuvem", "assets/nuvem.png");
    this.load.spritesheet("vi", "assets/vi.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    //  Load dos audios
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
    this.speed = 11;
    this.fall = 300;

    back = this.sound.add("fundoVi");
    back.play();
    this.add.image(768, 361, "jogo");

    //  Adiciona o texto da pontuacao
    this.scoreText = this.add.text(this.birdyX, gameMainHeight / 4, score, {
      fontFamily: '"04b19"',
      fontSize: 60,
      color: "#fff",
    });

    //  Grupo das nuvens e dos obstaculos
    this.nuvens = this.physics.add.staticGroup();
    this.platforms = this.physics.add.staticGroup();


    //  Cria os valores das platforms de forma random, em termos da localização do gap
    let pos = this.getRandom();

    //   Criacao das nuvens
    this.nuvens.create(gameMainWidth+5, 105, "nuvem").setScale(1).refreshBody();
    this.nuvens.create(gameMainWidth + 265, 35, "nuvem").setScale(1).refreshBody();
    this.nuvens.create(gameMainWidth + 330, 150, "nuvem").setScale(1).refreshBody();
    this.nuvens.create(gameMainWidth + 500, 80, "nuvem").setScale(1).refreshBody();
    this.nuvens.create(gameMainWidth + 630, 35, "nuvem").setScale(1).refreshBody();
    this.nuvens.create(gameMainWidth + 700, 105, "nuvem").setScale(1).refreshBody();

    //  Fisicas do jogador
    this.player = this.physics.add.sprite(this.birdyX, this.birdyY, "vi");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.25,1.25);
    //  Criacao dos obstaculos
    this.platforms
      .create(gameMainWidth, pos[0], "baixo")
      .setScale(1)
      .refreshBody();
    this.platforms
      .create(gameMainWidth, pos[1], "cima")
      .setScale(1)
      .refreshBody();




    this.player.body.setGravityY(this.fall);

    //  Sempre que "toca" nas plataformas executa o playerHit
    this.physics.add.collider(
      this.player,
      this.platforms,
      this.playerHit,
      null,
      gameMain
    );



    //  Definicao dos controlos
    this.input.keyboard.on("keydown-" + "W", this.flapNowBoostUp, this);
    this.input.keyboard.on("keydown-" + "S", this.flapNowBoostDown, this);
    this.input.keyboard.on("keydown-" + "SPACE", this.flapNowMouse, this);
  }

  update() {
    if (gameOver) {
      //  Para a musica
      back.stop();

      //  Executado qd o jogador colide com um obstaculo
      if (dieFlag) {
        this.sound.play("die"); //  Som die
        this.player.rotation += -2; //  Jogador roda
        this.player.alpha -=0.7;
        //  Fade da camera
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

    //  Vamos aumentar a dificuldade ao longo do jogo
    if (score === 10) {
      this.speed = 12;
      this.fall = 330;
      back.setRate(1.1); //  Vai aumetar a velocidade do som de fundo
    }

    if (score === 20) {
      this.speed = 15;
      this.fall = 363;
      back.setRate(1.2); //  Vai aumetar a velocidade do som de fundo
    }

    if (score === 30) {
      this.speed = 17;
      this.fall = 399;
      back.setRate(1.3); //  Vai aumetar a velocidade do som de fundo
    }
    if (score === 40) {
      this.speed = 19;
      this.fall = 439;
      back.setRate(1.4); //  Vai aumetar a velocidade do som de fundo
    }

    console.log("Speed: " + this.speed);

    let children = this.platforms.getChildren();
    let nuvensChi = this.nuvens.getChildren();

    //  Vai percorrer as plataformas, para ir criado mais
    children.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
        child.refreshBody();
        child.x -= this.speed;

        //  Conjunto de tubos é mostrado
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

        //  Se o pipe estiver fora do ecra vai remover
        if (child.x <= -50) {
          child.destroy();
        }

        //  Verifica se o player passou pelo obstaculo
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

        //  Se a nuvem estiver fora do ecra vai colocar-la para o inicio, para que fique sempre atras dos tubos
        if (childNuv.x <= -50) {
          childNuv.x = gameMainWidth+50;
        }
      }
    });
  }

  getRandom() {
    let safePadding = 25;
    let min = Math.ceil(safePadding + this.gap / 2);
    let max = Math.floor(gameMain.canvas.height - safePadding - this.gap / 2);
    let ran = Math.floor(Math.random() * (max - min + 1)) + min;
    let rantop = ran - (this.gap / 2 + 260); // Tubo de cima
    let ranbot = ran + (this.gap / 2 + 260); // Tubo de baixo

    return [ranbot, rantop];
  }

  //  Funções quando um input é feito
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
