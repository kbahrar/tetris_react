import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

export default function Chat(props) {
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState("");
    const socket = useSelector(state => state.socket);
    const auth = useSelector(state => state.auth);

    const typeMsg = (e) => {
        setMsg(e.target.value)
    }

    const sendMsg = (e) => {
        if (!msg)
            e.preventDefault()
        else {
            socket.emit("chat", [auth, msg])
            setMsg("")
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on("chat", (data) => {
                let msg = chat;
                msg[msg.length] = data;
                setChat([...msg])
            })

            return () => {
                socket.off("chat")
            }
        }
    }, [socket])

    return (
        <div className="chat">
            <div className="header-online">
                chat
            </div>
            <div className="chat-group">
                {chat.map((item, index) => (
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
                <div className="button-room" onClick={sendMsg}>
                    SEND
                </div>
            </div>
        </div>
    )
}