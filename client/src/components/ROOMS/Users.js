import React from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux'

export default function Users(props) {
    const socket = useSelector(state => state.socket)
    const users = useSelector(state => state.users)

    useEffect(() => {
        if (socket) {
            socket.emit("users")
        }
    }, [socket])

    return (
        <div className="users-online">
            <div className="header-online">
                {users.length} users online
            </div>
            {users?.map((item, index) => (
                <div key={index} className="user-online">{item}<div className="dot-online"></div></div>
            ))}
        </div>
    )
}