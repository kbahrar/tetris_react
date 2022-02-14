import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux'

export default function Chat(props) {
    const [msg, setMsg] = useState("");
    const socket = useSelector(state => state.socket);
    const messages = useSelector(state => state.messages);

    const typeMsg = (e) => {
        setMsg(e.target.value)
    }

    const sendMsg = (e) => {
        if (!msg)
            e.preventDefault()
        else {
            socket.emit("msg game", msg)
            setMsg("")
        }
    }

    return (
        <div className="chat">
            <div className="header-online">
                chat
            </div>
            <div className="chat-group">
                {messages.map((item, index) => (
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
                <div className="button-room" onClick={sendMsg}>
                    SEND
                </div>
            </div>
        </div>
    )
}