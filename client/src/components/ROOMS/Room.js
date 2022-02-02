import React from "react";
import { useState } from "react";
import { joinRoom } from "../../actions";
import { useSelector, useDispatch } from 'react-redux'
import Error from "../UTILS/Error";

export default function Room(props) {
    const rooms = useSelector(state => state.rooms);
    const [room, setRoom] = useState("");
    const socket = useSelector(state => state.socket);

    React.useEffect(() => {
        if (socket) {
            socket.emit("list room")
        }
    }, [socket])

    const changeRoomName = (e) => {
        setRoom(e.target.value)
    }

    const createRoom = (e) => {
        if (!room)
            e.preventDefault()
        else {
            setRoom("")
            socket.emit("create room", room)
        }
    }

    return (
        <div className="rooms">
            <div className="header-online">
                Rooms
            </div>
            <div className="rooms-group">
                {rooms.map((item, index) => (
                    <div key={index} className="user-online">
                        {item}
                        <div
                            key={"button-" + index}
                            className="join-room"
                        >
                            JOIN
                        </div>
                    </div>
                ))}
            </div>
            <div className="form-room">
                <input
                    type="text"
                    className="input-room"
                    placeholder="room name"
                    onChange={changeRoomName}
                    value={room}
                />
                <div className="button-room" onClick={createRoom}>
                    CREATE ROOM
                </div>
            </div>
            <Error />
        </div>
    )
}