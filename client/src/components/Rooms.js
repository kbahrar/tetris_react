import React from "react";
import { useState } from "react";
// import { authLogin } from "../actions"; 
// import { useDispatch, useSelector } from 'react-redux'

export default function Rooms(props) {
    const [users, setUsers] = useState(["kamal", "lamak", "opsa", "kola", "hohala"])

    return (
        <>
            <div className="users-online">
                <div className="header-online">
                    5 users online
                </div>
                {users.map((item, index) => (
                    <div key={index} className="user-online">{item}<div className="dot-online"></div></div>
                ))}
            </div>
            <div className="rooms">
                <div className="header-online">
                    Rooms
                </div>
                <div className="rooms-group">
                    {users.map((item, index) => (
                        <div key={index} className="user-online">{item} <div key={"button-" + index} className="join-room">JOIN</div> </div>
                    ))}
                </div>
                <div className="form-room"><input type="text" className="input-room" /> <div className="button-room">CREATE ROOM</div> </div>
            </div>
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
        </>
    )
}