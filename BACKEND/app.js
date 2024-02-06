const {Server} = require('socket.io');

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const mongoose = require("mongoose");
const helmet = require("helmet")
const cors = require("cors")

const {sessionMiddleware, wrap} = require("./controllers/serverController");

const apiRouter = require("./routes/api.js");

// app

const app = express();

const server = http.createServer(app);

  // Crée le socket io qui sera utilisé pour la websocket
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "https://admin.socket.io"],
      credentials: true
    },
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    }
  });

  //instrument(io, {auth: false, mode: "development"})


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: ["http://localhost:3000", "https://admin.socket.io"],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true
}));


server.listen(5000);

server.on('listening', function () {
    console.log("Le serveur est allumé");
});

server.on('error', function (error) {
    console.error(error);
});

// DDB

const mongoDBHost = process.env.MONGO_HOST || "localhost";

try{
    mongoose.connect(`mongodb://mongo-bdd:27017/mongo-bdd`)
    console.log("Connecté à mongoDB !")
  }catch {
    (error => console.log(error));
  }

// redis

app.use(sessionMiddleware);

// socket io

io.on("connect", (socket) =>{

  socket.join("hub");

  socket.on('newtopic', async () => {
    io.to("hub").emit("updatehub")
  })

  socket.on('jointopic', (topicID) => {
    const topicRoom = `topic-${topicID}`;
    socket.join(topicRoom);
  })
  socket.on('newmessage', (topicID) => {
    const topicRoom = `topic-${topicID}`;
    io.to(topicRoom).emit('updatemessages');
  });
  

  socket.on('disconnect', async (reason) => {
    //console.log('user disconnected : ' + socket.user.pseudo + " reason : ", reason);
  });
})

// routes

app.use('/api', apiRouter);