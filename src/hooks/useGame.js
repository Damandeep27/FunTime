import { useState, useEffect, useLayoutEffect } from 'react'
import { useCore, socket } from 'providers/CoreProvider'
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
    viewport: {
        width: 1903,
        height: 873
    }
};

export const useGame = () => {
    const { 
        canvasRef,
        ctxRef
    } = useCore();
    const { user } = useUser();
    const [players, setPlayers] = useState();

    // Player Class
    class Player {
        constructor(playerData) {
            const { id, name, emoji, x, y, dX, dY, isJumping, dir, viewport } = playerData;

            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.x = x;
            this.y = y;
            this.dX = dX;
            this.dY = dY;
            this.isJumping = isJumping;
            this.dir = dir;
            this.viewport = viewport;
        }

        draw(ctx) {
            const { width: playerViewWidth, height: playerViewHeight } = this.viewport;
            const { width: curUserViewWidth, height: curUserViewHeight } = keyStateObj.viewport;

            const sameViewport = playerViewWidth === curUserViewWidth && playerViewHeight === curUserViewHeight;

            const curX = this.x * curUserViewWidth / playerViewWidth;
            const curY = curUserViewHeight - (playerViewHeight - this.y);

            ctx.font = '36px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, sameViewport ? this.x : curX, sameViewport ? this.y : curY);

            ctx.font = '18px Poppins';
            ctx.fillText(this.name, sameViewport ? this.x : curX, sameViewport ? this.y - 40 : curY - 40);
        }

        update(playerData) {
            const { name, emoji, x, y, dX, dY, isJumping, dir, viewport } = playerData;

            this.name = name;
            this.emoji = emoji;
            this.x = x;
            this.y = y;
            this.dX = dX;
            this.dY = dY;
            this.isJumping = isJumping;
            this.dir = dir;
            this.viewport = viewport;

            if (!playerData.id) return;
            this.id = playerData.id;
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
        if (!user) return;

        const emojiArr = [...'😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖✌️🤟🤘🤙👋🐭🦕🦖🐉'];
        const emoji = emojiArr[Math.floor(Math.random() * emojiArr.length)];   
        const newPlayer = {
            name: user.displayName.trim(), 
            emoji,
            x: 48,
            y: 48,
            dX: 10, 
            dY: 10, 
            isJumping: false, 
            dir: 0,
            viewport: keyStateObj.viewport
        }

        socket.on('add-player', (playerData) => {
            AddPlayer(playerData);
        })

        socket.emit('add-player', newPlayer);

        return () => socket.off('add-player');
    }, [user])

    // Update all players
    useEffect(() => {
        if (!players) return;

        socket.on('update-players', (playersObj) => {
            UpdatePlayers(playersObj);
        });

        return () => socket.off('update-players');
    }, [players])

    // Remove Player Socket Listener
    useEffect(() => {
        socket.on('remove-player', (socketId) => {
            RemovePlayer(socketId);
        });

        return () => socket.off('remove-player')
    }, [])

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

    // Player movement socket and viewport update
    setInterval(() => {
        try {
            socket.emit('move-player', keyStateObj);

            if (!canvasRef.current) return;
            keyStateObj.viewport.width = canvasRef.current.width || 1903;
            keyStateObj.viewport.height = canvasRef.current.height || 873;
        }
        catch (err) {
            console.error(err);
        }
    }, 1000 / 60);

    return {
        AddPlayer,
        RenderPlayers,
        UpdatePlayers,
        RemovePlayer
    }
}