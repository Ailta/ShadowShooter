function init() {
	game.width = window.innerWidth - 2;
	game.height = window.innerHeight - 2;
	
	loop();
}

async function loop() {
   while (true) {
	    updateKeys(); // First, get controls and send them to server
		networkingUpdate(); // Second, sends commands to server
		draw(); // Third, draw stuff
		// wait a bit
		await new Promise(resolve => setTimeout(resolve, 1000 / 60));
   }
}


