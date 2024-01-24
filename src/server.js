const port = require('./conf').port;
const server = require('http').createServer(require('./app'));

const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log(`connected: ${socket.id}`);
	
	socket.on('disconnect', function () {
		console.log(`disconnect: ${socket.id}`);
	});
	
	loop(socket);
	
	socket.on('command', (arg) => {
		console.log(`${socket.id} command: ${arg}`);
		commands(arg, socket);
	});
	
	socket.on('dataToServer', function () {
		// Handle movement etc...
	});
});


let dataSendTick = 30;
async function loop(socket) {
   while (true) {
	  socket.emit('data', 'hi, Im data.');
	  
	  await new Promise(resolve => setTimeout(resolve, 1000 / dataSendTick));
   }
}

function commands(command, socket) {
	let success = false;
	
	command = command.replace(/\s+/g, '');
	command = command.split('=');
	
	if (command[0] == 'dataSendTick') {
		dataSendTick = Number(command[1]);
		
		success = true;
	}
	
	if (success) {
		socket.emit('commandAck', `${command[0]} has been set to: ${command[1]}`);
		console.log(`${command[0]} has been set to: ${command[1]}`);
	}
	else {
		socket.emit('commandAck', `Processing command failed.`);
		console.log(`Processing command failed.`);
	}
}

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

