class Game {
  constructor(div) {
    this.fps = 60;
    this.pressedKeys = {};
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext("2d");

    this.setSizes();
    window.onresize = this.onResize.bind(this);
  }

  start() {
    this.asteroidField = new AsteroidField();
    this.ship = new Ship(this.width / 2, this.height / 2);

    this.intervalId = setInterval(this.loop.bind(this), 1000 / this.fps);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  keyDown(keyCode) {
    this.pressedKeys[keyCode] = true;
  }

  keyUp(keyCode) {
    delete this.pressedKeys[keyCode];
  }

  setSizes() {
    this.width = 800;
    this.height = 400;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onResize() {
    this.setSizes();
    this.draw();
  }

  loop() {
    this.update();
    this.draw();
  }

  update() {
    this.respondToPressedKeys();
    this.updatePositions();
    this.checkForImpacts();
  }

  draw() {
    this.asteroidField.render();
    this.ship.render();
  }

  respondToPressedKeys() {
    if (this.pressedKeys[38]) {
      this.ship.accelerate();
    }
    if (this.pressedKeys[40]) {
      this.ship.brake();
    }
    if (this.pressedKeys[37]) {
      this.ship.turnLeft();
    }
    if (this.pressedKeys[39]) {
      this.ship.turnRight();
    }
    if (this.pressedKeys[32]) {
      this.ship.fireRocket();
    }
  }

  updatePositions() {
    let dt = 1 / this.fps;

    for (let asteroid of this.asteroidField.asteroids) {
      this.updateObjectPos(asteroid, dt);
    }

    for (let rocket of this.ship.rockets) {
      rocket.age += dt;
      this.updateObjectPos(rocket, dt);
    }
    this.ship.rockets = this.ship.rockets.filter(rocket => rocket.age < this.ship.maxRocketAge);

    this.updateObjectPos(this.ship, dt);
  }

  checkForImpacts() {
    for (let rocket of this.ship.rockets) {
      for (let asteroid of this.asteroidField.asteroids) {
        if (Utils.isCollided(rocket, asteroid)) {
          this.asteroidField.rocketHitsAsteroid(rocket, asteroid);
          if (this.asteroidField.asteroids.length === 0) {
            this.gameWon("Você venceu!!");
          }
        }
      }
      if (Utils.isCollided(rocket, this.ship) && rocket.age > 0.4) {
        this.gameOver("Sua nave foi destruída por um de seus foguetes!");
      }
    }

    for (let asteroid of this.asteroidField.asteroids) {
      if (Utils.isCollided(asteroid, this.ship)) {
        this.gameOver("Sua nave foi destruída por um asteroide!");
      }
    }
  }

  updateObjectPos(object, dt) {
    object.x += Utils.dXFromAngleAndHypot(object.heading, dt * object.velocity);
    object.y += Utils.dYFromAngleAndHypot(object.heading, dt * object.velocity);

    if (object.y > this.height) {
      object.y = 0;
    } else if (object.y < 0) {
      object.y = this.height;
    } else if (object.x > this.width) {
      object.x = 0;
    } else if (object.x < 0) {
      object.x = this.width;
    }
  }

  gameOver(message) {
    this.stop();
    setTimeout(this.printEndOfGameMessage.bind(this, message, true), this.intervalId + 1);
  }

  gameWon(message) {
    this.stop();
    setTimeout(this.printEndOfGameMessage.bind(this, message, false), this.intervalId + 1);
  }

  printEndOfGameMessage(message, gameLost) {
    let ctx = this.canvas.getContext("2d");
    ctx.fillStyle = '#fd9d6b';
    if (gameLost) {
      ctx.font = '48px serif';
      ctx.fillText('Fim do jogo!', this.width/2, this.height/2);
    }
    ctx.font = '24px serif';
    ctx.fillText(message, 10, 150);
  }
}
