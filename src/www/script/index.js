function init() {
	game.width = window.innerWidth - 2;
	game.height = window.innerHeight - 2;

   loop();
   loopMulti();
}

async function loop() {
   while (true) {
      
      draw();
      // wait a bit
      await new Promise(resolve => setTimeout(resolve, 1000 / 60));
   }
}

async function loopMulti() {
   while (true) {
      
      myFunc();
      // wait a bit
      await new Promise(resolve => setTimeout(resolve, 500));
   }
}


