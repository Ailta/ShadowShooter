module.exports = {getPlayers, onCall, onClientConnection, onClientDisconnect};

let players = {
	
	"next_id": 0
}

function onCall(controls, socket) {
	// This function gets called every time a key is pressed by some client
	// 'keys' is the key that is pressed and socket is the connection
	// We can use socket to get what client pressed what key
	// example:
	//console.log(`${keys} from player: ${socket.id}`);
	// This is where we will be handling movement
	
	//console.log(keys);
	
	let player;
	let idInPlayers;
	
	for (let i = 0; i < players.next_id; i++) {
		if (players[i].socket_id == socket.id) {
			player = players[i];
			idInPlayers = i;
		}
	}
	
	if (controls.up.pressed) {player.position_y -= player.speed;}
	if (controls.down.pressed) {player.position_y += player.speed;}
	if (controls.left.pressed) {player.position_x -= player.speed;}
	if (controls.right.pressed) {player.position_x += player.speed;}
	player.direction = controls.direction;
	
	players[idInPlayers] = player;
}

function onClientConnection(socket) {
	// This function gets called every time a client connects to the server (a connection is established between client and server)
	// This is where you will create player for every client that connects
	// This function might get extended in the future if player names are going to be a thing
	// Sending map data is in networking.js and is called right after this function
	
	players[players.next_id] = {position_x: 0,
	position_y: 0,
	speed: 10,
	direction: 0,
	name: '',
	socket_id: socket.id};
	
	players.next_id++;
	console.log(players);
}

function onClientDisconnect(socket) {
	// This function gets called every time a client is disconnected from the server (a connection is terminated between client and server)
	// This is where you will remove player for every client that connects
}

function getPlayers(socket) {
	// This function gets called every time the server wants to send data about players to the clients
	// I'm not sure what will this function return in the future
	// For now I think the data it returns should be the players socket.id, position, direction, name
	// Socket.id so that a client can filter out him self out of the data on his end
	
	return (players);
}