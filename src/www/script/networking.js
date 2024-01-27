const socket = io();
let com = false;

let name = '';

console.log(' ');
console.log(' ');
console.log('To send commands to server, type "com=true" into the console.');
console.log(' ');
console.log(' ');

// Command handling
async function commandsToServer() {
	if (com) {
		console.log('commands (x = number; y = text): dataSendTick=x\nclientName=y');
		const input = prompt('command:');
		
		console.log(input);
		socket.emit('command', input);
		
		com = false;
	}
	
	// Get ack from server
	socket.on('commandAck', (arg) => {
		console.log(arg);
	});
}



// Data handling
let hasMapData = false;
socket.on('dataOnConnection', (arg) => {
	if (!hasMapData)
	{
		console.log('Recieved map data from server, processing.');
		// Handle map data
	} else {
		console.log('Recieved map data from server, discarding.');
	}
});

socket.on('dataFromServer', (arg) => {
	for (let i = 0; i < arg.next_id; i++) {
		console.log(socket.id);
		if (arg[i].socket_id == socket.id) {
			player.x = arg[i].position_x;
			player.y = arg[i].position_y;
			player.direction = arg[i].direction;
		}
	}
});




// Updates networking (actually just sends data to server and allows for commands to work)
function networkingUpdate() {
	commandsToServer();
	socket.emit('dataToServer'); // Useless
}