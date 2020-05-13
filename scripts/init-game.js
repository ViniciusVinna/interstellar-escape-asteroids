const game = new Game();

const playButton = document.getElementById("play-btn");

playButton.addEventListener('click', function() {
  game.start();

  const classString = this.className;
  this.className = classString.concat(" is-playing");
})

window.addEventListener('keydown', function keydown(e) {
  var keycode = e.which || window.event.keycode;
  //  Supress further processing of left/up/right/down/space (37/38/39/40/32)
  if (
    keycode === 37 ||
    keycode === 38 ||
    keycode === 39 ||
    keycode === 40 ||
    keycode === 32
  ) {
    e.preventDefault();
  }
  game.keyDown(keycode);
});

window.addEventListener('keyup', function keyup(e) {
  var keycode = e.which || window.event.keycode;
  game.keyUp(keycode);
});
