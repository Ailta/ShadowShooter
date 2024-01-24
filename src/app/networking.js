module.exports = {onConnection};
const playersHandle = require('./playersHandle.js');
const mapsHandle = require('./mapsHandle.js');

// When client connects to server
function onConnection(socket) {
	console.log(`connected: ${socket.id}`);
	playersHandle.onClientConnection(socket);
	socket.emit('dataOnConnection', mapsHandle.returnMap(socket)); // Sends map data to all clients, it should be filtered on a client end
	
	socket.on('disconnect', function () {
		console.log(`disconnect: ${socket.id}`);
		playersHandle.onClientDisconnect(socket);
	});
	
	//socket.emit('dataOnConnection', 'hi, Im first data.'); // Add a proper function that will return data of a map etc.
	
	loop(socket);
	
	socket.on('command', (arg) => {
		console.log(`${socket.id} command: ${arg}`);
		commands(arg, socket);
	});
	
	socket.on('dataToServer', function () {
		// Handle data from client
	});
	
	socket.on('movement', (arg) => {
		playersHandle.onCall(arg, socket);
	});
	
}

// Smol loop that spams clients
// dataSendTick can be set from clients
let dataSendTick = 30;
async function loop(socket) {
   while (true) {
	  socket.emit('dataFromServer', 'hi, Im data.'); // Add a proper fuction that will return positions of players etc.
	  
	  await new Promise(resolve => setTimeout(resolve, 1000 / dataSendTick));
   }
}

// Here is where the server handles commands from clients
function commands(command, socket) {
	let success = false;
	
	// Get rid of all whitespaces in command
	command = command.replace(/\s+/g, '');
	// Split it into the command and value
	command = command.split('=');
	
	// Check for commands
	if (command[0] == 'dataSendTick') {
		dataSendTick = Number(command[1]);
		
		success = true;
	}
	
	// Return ack
	if (success) {
		socket.emit('commandAck', `${command[0]} has been set to: ${command[1]}`);
		console.log(`${command[0]} has been set to: ${command[1]}`);
	}
	else {
		socket.emit('commandAck', `Processing command failed.`);
		console.log(`Processing command failed.`);
	}
}