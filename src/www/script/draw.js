const game = document.getElementById("game");
const gameContext = game.getContext("2d");

let shadowColor = "black";
let flashlightColor = "lightgray";
let highlightColor = "white";

function clear() {
	gameContext.clearRect(0, 0, game.width, game.height);
   gameContext.fillStyle = flashlightColor;
   gameContext.fillRect(0, 0, game.width, game.height);
}

function draw() {
   clear();

   const offX = game.width / 2 - player.x;
   const offY = game.height / 2 - player.y;

   const plX = offX + player.x;
   const plY = offY + player.y;

   // half diagonal
   const darknessRadius = Math.sqrt(Math.pow(game.width, 2) + Math.pow(game.height, 2)) / 2;
   const shadowLength = darknessRadius * 6;

   // map
   for (object of items) {
      object.highlight(gameContext, offX, offY);
   }

   for (object of items) {
      object.draw(gameContext, offX, offY, shadowLength);
   }

   for (object of map) {
      object.draw(gameContext, offX, offY, shadowLength);
   }

   const gradient = gameContext.createRadialGradient(plX, plY, player.visionLengthInner, plX, plY, player.visionLengthOuter);
   gradient.addColorStop(0, "#00000000");
   gradient.addColorStop(1, shadowColor);

   // vision length
   gameContext.beginPath();
   gameContext.moveTo(plX, plY);
   gameContext.arc(plX, plY, darknessRadius,
                   player.direction - player.fov - 0.1,
                   player.direction + player.fov + 0.1);
   gameContext.lineTo(plX, plY);
   gameContext.fillStyle = gradient;
   gameContext.fill();

   // field of vision
   gameContext.beginPath();
   gameContext.moveTo(plX, plY);
   gameContext.arc(plX, plY, darknessRadius,
                   player.direction + player.fov,
                   player.direction - player.fov);
   gameContext.lineTo(plX, plY);
   gameContext.fillStyle = shadowColor;
   gameContext.fill();

   // player
   gameContext.beginPath();
   gameContext.arc(plX, plY, 30, 0, 2 * Math.PI);
   gameContext.fillStyle = shadowColor;
   gameContext.fill(); 

   drawGun(player.gun, plX, plY, player.direction, 30, gameContext);
}

