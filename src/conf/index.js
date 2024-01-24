// nahrani balicku dotenv
const dotenv = require('dotenv');

// nacteni konfiguracnich udaju ze souboru .env
dotenv.config();

// export nactenych hodnot
exports.port = process.env.PORT;
exports.secret = process.env.SECRET;
