const express = require('express');
const jsondb = require('simple-json-db');

const app = express();

// middle-ware pro prijem dat v JSONu
app.use(express.json());

app.use(express.static('./www'));

module.exports = app;
