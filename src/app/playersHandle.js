module.exports = {onCall, onClientConnection, onClientDisconnect};

function onCall (key, socket) {
	// This function gets called every time a key is pressed by some client
	// 'key' is the key that is pressed and socket is the connection
	// We can use socket to get what client pressed what key
	// example:
	//console.log(`${key} from player: ${socket.id}`);
	// This is where we will be handling movement
}

function onClientConnection (socket) {
	// This function gets called every time a client connects to the server (a connection is established between client and server)
	// This is where you will create player for every client that connects
	// This function might get extended in the future if player names are going to be a thing
	// Sending map data is in networking.js and is called right after this function
}

function onClientDisconnect (socket) {
	// This function gets called every time a client is disconnected from the server (a connection is terminated between client and server)
	// This is where you will remove player for every client that connects
}

function returnPlayersPostions () {
	// This function gets called every time the server wants to send data about players to the clients
	// I'm not sure what will this function return in the future
	// For now I think the data it returns should be the players socket.id, position, direction, name
	// Socket.id so that a client can filter out him self out of the data on his end
	
	// !!!This function is not yet implemented in networking.js!!!
	// !!!This function is not yet being called from networking.js!!!
}