const game = document.getElementById("game");
const gameContext = game.getContext("2d");

function clear() {
	gameContext.clearRect(0, 0, game.width, game.height);
}

function draw() {
   clear();

   const offX = game.width / 2 - player.x;
   const offY = game.height / 2 - player.y;

   const plX = offX + player.x;
   const plY = offY + player.y;

   // half diagonal
   const darknessRadius = Math.sqrt(Math.pow(game.width, 2) + Math.pow(game.height, 2)) / 2;

   // player
   gameContext.beginPath();
   gameContext.arc(plX, plY, 30, 0, 2 * Math.PI);
   gameContext.fillStyle = "gray";
   gameContext.fill(); 

   // vision
   gameContext.beginPath();
   gameContext.moveTo(plX, plY);
   gameContext.arc(plX, plY, darknessRadius,
                   player.direction + player.fov,
                   player.direction - player.fov);
   gameContext.lineTo(plX, plY);
   gameContext.fillStyle = "black";
   gameContext.fill();

   // 

   // map
   for (object of map) {
      object.draw(gameContext, offX, offY, darknessRadius);
   }
}

