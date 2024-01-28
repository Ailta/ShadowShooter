const port = require('./conf').port;
const server = require('http').createServer(require('./app'));

// Networking
const io = require('socket.io')(server);
const networking = require('./app/networking.js');

console.log(networking);

io.on('connection', socket => {
	networking.onConnection(socket);
});

// Start server
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

