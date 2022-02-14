import React from "react"
import { useSelector } from "react-redux"

export default function ScoreBoard(props) {
    const game = useSelector((state) => state.game)
    const room = useSelector(state => state.room)
    const socket = useSelector(state => state.socket)
    const auth = useSelector(state => state.auth)
    const [msg, setMsg] = React.useState('')
    const { score, isRunning, gameOver, canRestart } = game
    const play_btn = document.querySelector("#play-btn")
    const restart_btn = document.querySelector("#restart-btn")

    const start = () => {
        play_btn.blur()
        if (gameOver) { return }
        if (!isRunning) {
            socket.emit('start game')
        }
    }

    const restart = () => {
        restart_btn.blur()
        if (canRestart) {
            socket.emit('restart game')
        }
    }

    const typeMsg = (e) => {
        setMsg(e.target.value)
    }

    const sendMsg = (msg) => {
        socket.emit('msg room', msg)
        setMsg('')
    }

    return (
        <div className="score-board">
            <div className="info-dev">Score: {score}</div>
            <div className="info-dev">Level: 1</div>
            {auth?.name === room?.host ?
                <div className="controls">
                    {
                        !isRunning && !canRestart ? 
                            <button id="play-btn" className="control-button" onClick={start}>
                                Start
                            </button>
                        :
                        canRestart ?
                        <button id="restart-btn" className="control-button" onClick={restart}>
                            Restart
                        </button>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }
            <div className="chat-room">
            <div className="header-online">
                chat
            </div>
            <div className="chat-group">
                {room?.messages.map((item, index) => (
                    <div className={"message-" + item.type} key={index}>
                        <span className="message-sender">
                            {item.sender}:
                        </span> 
                        <span className="message">{item.msg}</span>
                    </div>
                ))}
            </div>
            <div className="form-room">
                <input
                    type="text"
                    className="input-room"
                    placeholder="type message ..."
                    onChange={typeMsg}
                    value={msg}
                />
                <div className="button-room" onClick={() => sendMsg(msg)}>
                    SEND
                </div>
            </div>
        </div>
        </div>
    )
}