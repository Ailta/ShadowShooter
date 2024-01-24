module.exports = {returnMap};

// We migh need players from playersHandle.js, so we will have to add a reference to that data
// Or we can use database (there is a file in ShadowShooter/data/player.json) that we could use
// Format of player data is not yet determined, but it could be a players position, name, socked.id

function returnMap(socket) {
	// This function gets called right after the player is added in playersHandle.js
	// This function is supposed to return a map, what it'll return is not yet determined
}
