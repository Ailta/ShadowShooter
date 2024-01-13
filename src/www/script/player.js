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
})

document.addEventListener("keydown", event => {
   if (event.key == "w") {
      player.y -= player.speed;
   } 
   if (event.key == "s") {
      player.y += player.speed;
   } 
   if (event.key == "a") {
      player.x -= player.speed;
   } 
   if (event.key == "d") {
      player.x += player.speed;
   }
})
