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

        socket.on('send-message', ({ messageData }) => {
            io.emit('receive-message', messageData);
        })

        socket.on('add-player', ({ playerData }) => {
            Object.values(players).filter((pData) => pData.id !== playerData.id).forEach((curPlayerData) => {
                socket.emit('add-player', curPlayerData);
            })

            io.emit('add-player', playerData);
        })

        socket.on('update-player', (stateObj) => {
            const { 
                keys: { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, w, s, a, d, ' ': space },
                player: { id, name, emoji, x, y, dX, dY, isJumping, dir }
            } = stateObj;

            const up = ArrowUp || w || space;
            const down = ArrowDown || s;
            const left = ArrowLeft || a;
            const right = ArrowRight || d;

            let newX = x;
            let newY = y;
            let newDX = dX;
            let newDY = dY;
            let newIsJumping = isJumping;
            let newDir = dir;

            if (up && !isJumping) {
                newDY -= gamePhysics.jumpVelocity;
                newIsJumping = true;
            }

            if (down) {
                newDY += gamePhysics.jumpVelocity;
            }

            if (newX + 20) { // < width
                if (newIsJumping && right) {
                    newDX += gamePhysics.sideJumpVelocity;
                }
                if (right) {
                    newDX += gamePhysics.playerSpeed;
                    newDir = 0;
                } 
            }

            if (newX > 0) {
                if (newIsJumping && left) {
                    newDX -= gamePhysics.sideJumpVelocity;
                }
                if (left) {
                    newDX -= gamePhysics.playerSpeed;
                    newDir = 0;
                }
            }

            newDY += gamePhysics.gravity;
            newX += newDX;
            newY += newDY;
            newDX *= 0.9;
            newDY *= 0.9;

            if (newX + newDX < 0) {
                newX = 0;
            }
    
            // if (newX > width) {
            //     newX = width - newDX - 20;
            // }
    
            if (newY >= 660) {
                newIsJumping = false;
                newY = 660;
            }

            const playerData = {
                id,
                name,
                emoji,
                x: newX, 
                y: newY, 
                dX: newDX, 
                dY: newDY, 
                isJumping: newIsJumping, 
                dir: newDir,
                socketId: socket.id
            }

            players[socket.id] = {...playerData};

            io.emit('update-player', playerData);
        })

        socket.on('disconnect', () => {
            delete players[socket.id];
            io.emit('remove-player', socket.id);
            console.log(`[FunTime] user <${socket.id}> disconnected`);
        });
    });
});