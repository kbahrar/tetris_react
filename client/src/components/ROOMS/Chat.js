import React from "react";
import { useState } from "react";
// import { authLogin } from "../actions"; 
// import { useDispatch, useSelector } from 'react-redux'

export default function Chat(props) {
    const [users, setUsers] = useState(["kamal", "lamak", "opsa", "kola", "hohala"])

    return (
        <div className="chat">
            <div className="header-online">
                chat
            </div>
            <div className="chat-group">
                {users.map((item, index) => (
                    <>
                        <div className="message" key={index}>
                            <span className="message-sender">{item}
                            </span> : {item}
                        </div>
                    </>
                ))}
            </div>
            <div className="form-room"><input type="text" className="input-room" /> <div className="button-room">SEND</div> </div>
        </div>
    )
}