const package = require(__dirname + '/package.json');
const APP_NAME = package.name
const SERVER_PORT = 80;

const express = require('express');
const app = express();

app.use('', require(__dirname + '/api/index.js'));

app.listen(SERVER_PORT, function () {
    console.log(APP_NAME + " listening on port " + SERVER_PORT + ".");
});