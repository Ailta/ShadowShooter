let player = {
   x: 0,
   y: 0,

   direction: 0, // radians
   fov: 0.5,
}

game.addEventListener("mousemove", event => {
   // temporary mouse control
   controls.direction = Math.atan2(event.offsetY - game.height / 2, event.offsetX - game.width / 2)
});

let controls = {
	up: {pressed:false},
	down: {pressed:false},
	right: {pressed:false},
	left: {pressed:false},
	direction: {radians:0}
}

document.addEventListener("keydown", event => {
	if (event.key == "w" || event.key == "ArrowUp" && !controls.up.pressed) {controls.up.pressed = true;} 
	if (event.key == "s" || event.key == "ArrowDown" && !controls.down.pressed) {controls.down.pressed = true;} 
	if (event.key == "a" || event.key == "ArrowLeft" && !controls.left.pressed) {controls.left.pressed = true;} 
	if (event.key == "d" || event.key == "ArrowRight" && !controls.right.pressed) {controls.right.pressed = true;}
});

function updateKeys() {
	socket.emit('movement', controls);
}

document.addEventListener("keyup", event => {
	if (event.key == "w" || event.key == "ArrowUp" && controls.up.pressed) {controls.up.pressed = false;} 
	if (event.key == "s" || event.key == "ArrowDown" && controls.down.pressed) {controls.down.pressed = false;} 
	if (event.key == "a" || event.key == "ArrowLeft" && controls.left.pressed) {controls.left.pressed = false;} 
	if (event.key == "d" || event.key == "ArrowRight" && controls.right.pressed) {controls.right.pressed = false;}
});