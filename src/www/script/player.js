let player = {
   x: 0,
   y: 0,
   speed: 10,

   direction: 0, // radians
   fov: 0.5,
}

game.addEventListener("mousemove", event => {
   // temporary mouse control
   player.direction = Math.atan2(event.offsetY - game.height / 2, event.offsetX - game.width / 2)
});

let keys = {
	up: {pressed:false},
	down: {pressed:false},
	right: {pressed:false},
	left: {pressed:false}
}

document.addEventListener("keydown", event => {
	if (event.key == "w" || event.key == "ArrowUp" && !keys.up.pressed) {keys.up.pressed = true;} 
	if (event.key == "s" || event.key == "ArrowDown" && !keys.down.pressed) {keys.down.pressed = true;} 
	if (event.key == "a" || event.key == "ArrowLeft" && !keys.left.pressed) {keys.left.pressed = true;} 
	if (event.key == "d" || event.key == "ArrowRight" && !keys.right.pressed) {keys.right.pressed = true;}
});

function updateKeys() {
	socket.emit('movement', keys);
}

document.addEventListener("keyup", event => {
	if (event.key == "w" || event.key == "ArrowUp" && keys.up.pressed) {keys.up.pressed = false;} 
	if (event.key == "s" || event.key == "ArrowDown" && keys.down.pressed) {keys.down.pressed = false;} 
	if (event.key == "a" || event.key == "ArrowLeft" && keys.left.pressed) {keys.left.pressed = false;} 
	if (event.key == "d" || event.key == "ArrowRight" && keys.right.pressed) {keys.right.pressed = false;}
});