import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { pause, restart, resume } from "../../actions"

export default function ScoreBoard(props) {
    const dispatch = useDispatch()
    const game = useSelector((state) => state.game)
    const room = useSelector(state => state.room)
    const socket = useSelector(state => state.socket)
    const [msg, setMsg] = React.useState('')
    const { score, isRunning, gameOver } = game

    const togglePlay = () => {
        if (gameOver) { return }
        if (isRunning) {
            dispatch(pause())
        } else {
            dispatch(resume())
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
            <div className="controls">
                <button className="control-button" onClick={togglePlay}>
                    {isRunning ? 'Pause' : 'Play'}
                </button>
                <button className="control-button" onClick={(e) => {
                    dispatch(restart())
                }}>
                    Restart
                </button>
            </div>
            <div className="chat">
            <div className="header-online">
                chat
            </div>
            <div className="chat-group">
                {room?.messages.map((item, index) => (
                    <div className="message" key={index}>
                        <span className="message-sender">
                            {item.sender}
                        </span> : {item.msg}
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