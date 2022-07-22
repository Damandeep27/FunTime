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

        // move a player
        socket.on('move-player', (keyStateObj) => {
            if (!players) return;

            const { 
                viewport: { width, height },
                ArrowUp, ArrowDown, ArrowLeft, ArrowRight, w, s, a, d, ' ': space 
            } = keyStateObj;

            const up = ArrowUp || w || space;
            const down = ArrowDown || s;
            const left = ArrowLeft || a;
            const right = ArrowRight || d;

            let player = players[socket.id];

            if (!player) return;

            if (up && !player.isJumping) {
                player.dY -= gamePhysics.jumpVelocity;
                player.isJumping = true;
            }
            
            if (down) {
                player.dY += gamePhysics.jumpVelocity;
            }

            if (player.x + 20) { // < width
                if (player.isJumping && right) {
                    player.dX += gamePhysics.sideJumpVelocity;
                }
                if (right) {
                    player.dX += gamePhysics.playerSpeed;
                    player.direction = 0;
                } 
            }

            if (player.x > 0) {
                if (player.isJumping && left) {
                    player.dX -= gamePhysics.sideJumpVelocity;
                }
                if (left) {
                    player.dX -= gamePhysics.playerSpeed;
                    player.direction = 0;
                }
            }

            player.dY += gamePhysics.gravity;
            player.x += player.dX;
            player.y += player.dY;
            player.dX *= 0.9;
            player.dY *= 0.9;

            if (player.x + player.dX < 0) {
                player.x = 38;
            }
    
            if (player.x > width) {
                player.x = width - player.dX - 38;
            }

            if (player.y >= height - 38) {
                player.isJumping = false;
                player.y = height - 38;
            }
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