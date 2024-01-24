# in 'src' folder, add file '.env' and folder 'conf'
# inside '.env' file:

PORT = 6060
SECRET = 6060

# add file 'index.js'
# inside 'index.js' file:

// nahrani balicku dotenv
const dotenv = require('dotenv');

// nacteni konfiguracnich udaju ze souboru .env
dotenv.config();

// export nactenych hodnot
exports.port = process.env.PORT;
exports.secret = process.env.SECRET;

# and then open 'src' folder in cmd and type "npm install", it will install all the necessary packages
# to start the server type "npm run dev" in cmd that is in opened in 'src' folder
