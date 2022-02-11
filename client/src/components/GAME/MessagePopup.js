import React from "react";
import { useSelector } from 'react-redux'

export default function MessagePopup(props) {
    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)
    const winner = useSelector((state) => state.game.winner)
    const username = useSelector((state) => state.auth?.name)

    var classname = 'message-popup'
    var msg = {title: '', messages: []}

    if (isRunning && !gameOver)
        classname = 'message-popup-hidden'
    
    if (!isRunning) {
        msg.title = 'Waiting to Start !'
        msg.messages = [
            'You can start your game by click in start button',
            'keyboard instrections :',
            'DOWN to move down',
            'UP to rotate piece',
            'RIGHT to move right',
            'LEFT to move left',
            'SPACE to hard drop'
        ]
    }

    if (gameOver) {
        msg.title = 'Game Over'
        msg.messages = ['You can restart your game by click in restart button']
    }

    if (winner) {
        console.log(winner, username)
        msg.messages = ['You can restart your game by click in restart button']
        if (winner === username)
            msg.title = "YOU ARE THE WINNER !"
        else
            msg.title = winner + " WIN THIS GAME !"
    }
    
    const messages = msg?.messages?.map((item, key) => {
        return (<p key={key}>{item}</p>)
    })
    return (
        <div className={classname}>
            <h1>{msg.title}</h1>
            {messages}
        </div>
    )
}