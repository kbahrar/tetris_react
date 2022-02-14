import React, { useEffect } from "react";
import { useSelector } from 'react-redux'

export default function Controls(props) {
    const keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ESPACE: 32
    }
    Object.freeze(keys)

    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)
    const socket = useSelector(state => state.socket)

    const handleMoves = () => {
        return
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.keyCode) {
                case keys.UP:
                    socket.emit('move piece', keys.UP)
                    return
                case keys.DOWN:
                    socket.emit('move piece', keys.DOWN)
                    return
                case keys.LEFT:
                    socket.emit('move piece', keys.LEFT)
                    return
                case keys.RIGHT:
                    socket.emit('move piece', keys.RIGHT)
                    return
                case keys.ESPACE:
                    socket.emit('move piece', keys.ESPACE)
                    return
                default:
                    return
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning, keys, socket])

    return (
        <div className="controls">
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves()}>Left</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves()}>Right</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves()}>Rotate</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves()}>Down</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves()}>Drop</button>
        </div>
    )
}