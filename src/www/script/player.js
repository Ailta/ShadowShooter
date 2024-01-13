let player = {
   x: 0,
   y: 0,

   direction: 0, // radians
   fov: 0.3,
}

game.addEventListener("mousemove", event => {
   // temporary mouse control
   player.direction = Math.atan2(event.offsetY - game.height / 2, event.offsetX - game.width / 2)
})
