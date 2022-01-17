import React from "react";
import { useState } from "react";
// import { authLogin } from "../actions"; 
// import { useDispatch, useSelector } from 'react-redux'

export default function Users(props) {
    const [users, setUsers] = useState(["kamal", "lamak", "opsa", "kola", "hohala"])

    return (
        <div className="users-online">
            <div className="header-online">
                5 users online
            </div>
            {users.map((item, index) => (
                <div key={index} className="user-online">{item}<div className="dot-online"></div></div>
            ))}
        </div>
    )
}