import { useState, useEffect, useLayoutEffect } from 'react'
import { useCore } from 'providers/CoreProvider'
import { useUser } from 'providers/UserProvider'

let keyStateObj = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false,
    f: false,
    ' ': false,
};

export const useGame = () => {
    const { 
        socket,
        canvasRef,
        ctxRef
    } = useCore();
    const { playerId } = useUser();
    const [players, setPlayers] = useState();

    // Player Class
    class Player {
        constructor(playerData) {
            const { id, name, emoji, x, y, dX, dY, isJumping, dir } = playerData;

            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.x = x;
            this.y = y;
            this.dX = dX;
            this.dY = dY;
            this.isJumping = isJumping;
            this.dir = dir;
        }

        draw(ctx) {
            ctx.font = '36px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, this.x, this.y);

            ctx.font = '18px Poppins';
            ctx.fillText(this.name, this.x, this.y - 40);
        }

        update(playerData) {
            const { id, name, emoji, x, y, dX, dY, isJumping, dir } = playerData;

            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.x = x;
            this.y = y;
            this.dX = dX;
            this.dY = dY;
            this.isJumping = isJumping;
            this.dir = dir;
        }
    }

    // Render Game Graphics
    useLayoutEffect(() => {
        if (!canvasRef, !players) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            RenderPlayers(ctx);
            requestAnimationFrame(render);
        }
        render();

        return () => cancelAnimationFrame(render);

    }, [canvasRef, players])

    // Add player on user join
    useEffect(() => {
        if (!socket) return;

        const emojiArr = [...'😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖✌️🤟🤘🤙👋🐭🦕🦖🐉'];
        const emoji = emojiArr[Math.floor(Math.random() * emojiArr.length)];   
        const newPlayer = {
            name: 'Stephen', 
            emoji,
            x: 48,
            y: 48,
            dX: 10, 
            dY: 10, 
            isJumping: false, 
            dir: 0
        }

        socket.emit('add-player', newPlayer);

    }, [socket])

    // Add player on user join
    useEffect(() => {
        if (!socket) return;

        socket.on('add-player', (playerData) => {
            AddPlayer(playerData);
        })

        return () => socket.off('add-player');
    }, [socket])

    // Update all players
    useEffect(() => {
        if (!socket || !players) return;

        socket.on('update-players', (playersObj) => {
            UpdatePlayers(playersObj);
        });

        return () => socket.off('update-players');
    }, [socket, players])

    // Remove Player Socket Listener
    useEffect(() => {
        if (!socket) return;

        socket.on('remove-player', (socketId) => {
            RemovePlayer(socketId);
        });

        return () => socket.off('remove-player')
    }, [socket])

    // Key Down Listener
    useEffect(() => {
        const keyListener = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') e.preventDefault();
            if (Object.keys(keyStateObj).indexOf(e.key) === -1) return;

            keyStateObj[e.key] = true;
        }
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
    }, [])

    // Key Up Listener
    useEffect(() => {
        const keyListener = (e) => {
            if (Object.keys(keyStateObj).indexOf(e.key) === -1) return;

            keyStateObj[e.key] = false;
        }
        window.addEventListener('keyup', keyListener);
        return () => window.removeEventListener('keyup', keyListener);
    }, [])

    /**
     * Creates a new player
     * @param {*} playerData object data of new player
     */
    const AddPlayer = (playerData) => {
        try {
            setPlayers((prevState) => {
                const newPlayers = { ...prevState };
                newPlayers[playerData.id] = new Player(playerData);
                return newPlayers;
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Render all players on canvas
     * @param {CanvasRenderingContext2D} ctx canvas' 2d context
     */
    const RenderPlayers = (ctx) => {
        try {
            Object.values(players).forEach((player) => {
                player.draw(ctx);
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Updates all player's coordinates on canvas
     * @param {*} playersObj object of players
     */
    const UpdatePlayers = (playersObj) => {
        try {
            Object.entries(players).forEach((playerData) => {
                const [socketId, player] = playerData;
                player.update(playersObj[socketId]);
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    /**
     * Remove a player from player array by socketId
     * @param {String} socketId 
     */
    const RemovePlayer = (socketId) => {
        try {
            setPlayers((prevState) => {
                const newPlayers = {...prevState};
                delete newPlayers[socketId];
                return newPlayers;
            })
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        AddPlayer,
        RenderPlayers,
        UpdatePlayers,
        RemovePlayer
    }
}