import React, { useEffect } from "react";
import { useSelector, useDispatch, } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate, drop } from '../../actions'

export default function Controls(props) {
    const keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ESPACE: 32
    }
    Object.freeze(keys)

    const dispatch = useDispatch()
    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)
    const socket = useSelector(state => state.socket)

    const handleMoves = (moveFunc) => {
        if (!isRunning || gameOver) {
            return
        }
        dispatch(moveFunc())
    }

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning])

    return (
        <div className="controls">
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves(moveLeft)}>Left</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves(moveRight)}>Right</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves(rotate)}>Rotate</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves(moveDown)}>Down</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={() => handleMoves(drop)}>Drop</button>
        </div>
    )
}