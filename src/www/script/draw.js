const game = document.getElementById("game");
const gameContext = game.getContext("2d");

function clear() {
	gameContext.clearRect(0, 0, game.width, game.height);
}

function draw() {
   clear();

   const offX = game.width / 2 - player.x;
   const offY = game.height / 2 - player.y;

   // half diagonal
   const darknessRadius = Math.sqrt(Math.pow(game.width, 2) + Math.pow(game.height, 2)) / 2;

   // player
   gameContext.beginPath();
   gameContext.arc(offX, offY, 30, 0, 2 * Math.PI);
   gameContext.fillStyle = "gray";
   gameContext.fill(); 

   // vision
   gameContext.beginPath();
   gameContext.moveTo(offX, offY);
   gameContext.arc(offX, offY, darknessRadius,
                   player.direction + player.fov,
                   player.direction - player.fov);
   gameContext.lineTo(offX, offY);
   gameContext.fillStyle = "black";
   gameContext.fill();

   // 

   // map
   for (object of map) {
      object.draw(gameContext, offX, offY);
   }
}

