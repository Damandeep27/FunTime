// Dependencies
const dotenv = require("dotenv").config();
const path = require('path');
const express = require("express");
const cors = require('cors');
const router = require("./routes/index.js");
const app = express();
const socket = require("socket.io");
const { errorHandler } = require('#middlewares/errorHandler.js');
const gamePhysics = require('./src/utils/physics.js')

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
app.use('/api', router);
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Connections
connection.once('open', () => {
    console.log("[FunTime] Connected to MongoDB")

    const server = app.listen(process.env.PORT || 8080, () => {
        console.log(`[FunTime] listening at http://localhost:${process.env.PORT || 8080}`)
    })

    const io = socket(server);

    let players = {};

    // Web Socket Connection
    io.on('connection', (socket) => {
        console.log(`[FunTime] user <${socket.id}> connected`);

        // add new player
        socket.on('add-player', (playerData) => {
            players[socket.id] = { ...playerData, id: socket.id };

            Object.values(players).filter((pData) => pData.id !== playerData.id).forEach((curPlayerData) => {
                socket.emit('add-player', curPlayerData);
            })

            io.emit('add-player', { ...playerData, id: socket.id });
        })

        // update all players
        setInterval(() => {      
            io.emit('update-players', players);
        }, 1000 / 60);

        // send chat message
        socket.on('send-message', (messageData) => {
            io.emit('receive-message', messageData);
        })

        // player disconnect
        socket.on('disconnect', () => {
            delete players[socket.id];
            io.emit('remove-player', socket.id);
            console.log(`[FunTime] user <${socket.id}> disconnected`);
        });
    });
});