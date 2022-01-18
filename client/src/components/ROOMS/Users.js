import React from "react";
import { useState, useEffect } from "react";
// import { authLogin } from "../actions"; 
import { useSelector } from 'react-redux'

export default function Users(props) {
    const [users, setUsers] = useState([])
    const socket = useSelector(state => state.socket)

    useEffect(() => {
        console.log("hii")
        if (socket) {
            socket.emit("users")

            socket.on("users", (data) => {
                console.log(data);
                if (data)
                    setUsers(data)
            })
        }
    }, [socket])

    return (
        <div className="users-online">
            <div className="header-online">
                {users.length} users online
            </div>
            {users.map((item, index) => (
                <div key={index} className="user-online">{item}<div className="dot-online"></div></div>
            ))}
        </div>
    )
}