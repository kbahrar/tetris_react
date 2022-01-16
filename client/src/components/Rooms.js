import React from "react";
import { useState } from "react";
// import { authLogin } from "../actions"; 
// import { useDispatch, useSelector } from 'react-redux'

export default function Rooms(props) {
    const [users, setUsers] = useState(["kamal", "lamak", "opsa", "kola", "koka"])

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
                {users.map((item, index) => (
                    <div key={index} className="user-online">{item} <div key={"button-" + index} className="join-room">JOIN</div> </div>
                ))}
            </div>
            <div className="chat">
                <div className="header-online">
                    chat
                </div>
                {users.map((item, index) => (
                    <>
                        <fieldset key={index} className="message"><legend className="message-sender">{item}</legend>{item}</fieldset>
                    </>
                ))}
            </div>
        </>
    )
}