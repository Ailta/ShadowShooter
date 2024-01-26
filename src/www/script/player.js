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
	if (keys.up.pressed) {player.y -= player.speed;}
	if (keys.down.pressed) {player.y += player.speed;}
	if (keys.left.pressed) {player.x -= player.speed;}
	if (keys.right.pressed) {player.x += player.speed;}
	
	socket.emit('movement', keys);
}

document.addEventListener("keyup", event => {
	if (event.key == "w" || event.key == "ArrowUp" && keys.up.pressed) {keys.up.pressed = false;} 
	if (event.key == "s" || event.key == "ArrowDown" && keys.down.pressed) {keys.down.pressed = false;} 
	if (event.key == "a" || event.key == "ArrowLeft" && keys.left.pressed) {keys.left.pressed = false;} 
	if (event.key == "d" || event.key == "ArrowRight" && keys.right.pressed) {keys.right.pressed = false;}
});