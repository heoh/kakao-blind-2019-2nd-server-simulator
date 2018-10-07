const package = require(__dirname + '/package.json');
const APP_NAME = package.name
const SERVER_PORT = 8080;

const express = require('express');
const app = express();

app.listen(SERVER_PORT, function () {
    console.log(APP_NAME + " listening on port " + SERVER_PORT + ".");
});