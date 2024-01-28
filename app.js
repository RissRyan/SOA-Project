const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");

const apiRouter = require("./routes/api.js");

// app

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);

server.listen(3000);

server.on('listening', function () {
    console.log("Le serveur est allumé");
});

server.on('error', function (error) {
    console.error(error);
});

// routes

app.use('/api', apiRouter);