// Dependencies
require("dotenv").config();
const path = require('path');
const express = require("express");
const cors = require('cors');
const router = require("./routes/index.js");

const app = express();
const server = require("http").Server(app);
const { errorHandler } = require('#middlewares/errorHandler.js');
const io = require("socket.io")(server, { 
    cors: {
        origin: ['http://localhost:8080', 'https://fun--time.herokuapp.com']
    }
});
const { addPlayer, movePlayer, sendMessage, disconnect } = require('#socket/listeners.js')(io);

// Database
const connection = require("./connection.js");

// Cors
const corsOption = {
    origin: ['http://localhost:8080', 'https://fun--time.herokuapp.com'],
    optionsSuccessStatus: 200
}

// Express Config
app.options(cors(corsOption));
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if(corsOption.origin.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }       

    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
})
app.use(express.static("public"));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use('/api/v1',router);
app.use(errorHandler);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Connections
connection.once('open', () => {
    console.log("[FunTime] Connected to MongoDB")

    server.listen(process.env.PORT || 8080, () => {
        console.log(`[FunTime] listening at http://localhost:${process.env.PORT || 8080}`)
    })

    // Web Socket Connection
    io.on('connection', (socket) => {
        console.log(`[FunTime] user <${socket.id}> connected`);

        // Socket Listeners
        socket.on('add-player', addPlayer);
        socket.on('move-player', movePlayer);
        socket.on('send-message', sendMessage);
        socket.on('disconnect', disconnect);
    });
});