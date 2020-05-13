class Asteroid {
  constructor(x, y, heading, velocity, size) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.velocity = velocity;
    this.size = size;
  }

  render() {
    game.ctx.fillStyle = '#00ffed';
    let leftX = this.x - this.size / 2;
    let topY = this.y - this.size / 2
    game.ctx.fillRect(leftX, topY, this.size, this.size);
  }
}

class AsteroidField {
  constructor() {
    this.asteroidSizes = [8, 16, 32];
    this.nAsteroids = 10;
    this.asteroids = [];
    this.asteroidsPerSplit = 3;
    this.minVelocity = 5;
    this.maxVelocity = 30;

    for (let i = 0; i < this.nAsteroids; i++) {
      this.asteroids.push(this.createRandomAsteroid());
    }
  }

  rocketHitsAsteroid(rocket, asteroid) {
    if (asteroid.size > this.asteroidSizes[0]) {
      for (let i = 0; i < this.asteroidsPerSplit; i++) {
        this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, Math.random() * 360, asteroid.velocity, asteroid.size / 2));
      }
    }
    asteroid.size = 0;
    rocket.age = game.ship.maxRocketAge;
    this.asteroids = this.asteroids.filter(asteroid => asteroid.size > 0);
  }

  render() {
    game.ctx.fillStyle = '#010729';
    game.ctx.fillRect(0, 0, game.width, game.height);

    for (let asteroid of this.asteroids) {
      asteroid.render();
    }
  }

  createRandomAsteroid() {
    let xPos = Math.random() * game.width;
    let yPos = Math.random() * game.height;
    let size = this.asteroidSizes[Math.floor(Math.random() * this.asteroidSizes.length)];
    let velocity = this.minVelocity + (Math.random() * (this.maxVelocity - this.minVelocity));
    let heading = Math.random() * 360;
    return new Asteroid(xPos, yPos, heading, velocity, size);
  }
}

