class Rocket {
  constructor(x, y, heading) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.velocity = 75;
    this.size = 2;
    this.age = 0;
  }

  render() {
    game.ctx.fillStyle = '#ffeb01';
    game.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
