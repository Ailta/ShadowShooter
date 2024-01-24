const socket = io();
let com = false;

console.log('To send commands to server, type "com=true" into the console.');

async function commandsToServer() {
	if (com) {
		console.log('commands (x = number): dataSendTick=x\n');
		const input = prompt('command:');
		
		console.log(input);
		socket.emit('command', input);
		
		com = false;
	}
	
	socket.on('commandAck', (arg) => {
		console.log(arg);
	});
}

socket.on('data', (arg) => {
	console.log(arg);
	// Handle data from server (positions etc.)
});

function networkingUpdate() {
	commandsToServer();
	socket.emit('dataToServer');
}