import React from "react";
import { useSelector } from 'react-redux'

export default function MessagePopup(props) {
    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)
    var classname = 'message-popup'
    var msg = {title: '', message: ''}

    if (isRunning && !gameOver)
        classname = 'message-popup-hidden'
    
    if (!isRunning) {
        msg.title = 'Paused'
        msg.message = 'You can resume your game by click in play button'
    }

    if (gameOver) {
        msg.title = 'Game Over'
        msg.message = 'You can restart your game by click in restart button'
    }
    
    return (
        <div className={classname}>
            <h1>{msg.title}</h1>
            <p>{msg.message}</p>
        </div>
    )
}