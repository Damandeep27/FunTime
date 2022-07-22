const gamePhysics = require('#socket/physics.js');

module.exports = (io) => {

    let players = {};

    const addPlayer = function (playerData) {
        const socket = this;

        players[socket.id] = { ...playerData, id: socket.id };

        Object.values(players).filter((pData) => pData.id !== playerData.id).forEach((curPlayerData) => {
            socket.emit('add-player', curPlayerData);
        })

        io.emit('add-player', { ...playerData, id: socket.id });
    }

    const movePlayer = function (keyStateObj) {
        const socket = this;

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

        player.viewport.width = width;
        player.viewport.height = height;

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
    }

    const sendMessage = function (messageData) {
        io.emit('receive-message', messageData);
    }

    const disconnect = function () {
        const socket = this;

        delete players[socket.id];
        io.emit('remove-player', socket.id);

        console.log(`[FunTime] user <${socket.id}> disconnected`);
    }

    // Update all players on all clients
    setInterval(() => {
        io.emit('update-players', players);
    }, 1000 / 60);

    return {
        addPlayer,
        movePlayer,
        sendMessage,
        disconnect
    }
}