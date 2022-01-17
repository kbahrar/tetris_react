import React from "react";
import { useState } from "react";
// import { authLogin } from "../actions"; 
// import { useDispatch, useSelector } from 'react-redux'

export default function Room(props) {
    const [users, setUsers] = useState(["kamal", "lamak", "opsa", "kola", "hohala"])

    return (
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
    )
}