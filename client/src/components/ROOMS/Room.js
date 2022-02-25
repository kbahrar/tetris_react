import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setError, setRooms } from "../../actions";
import Error from "../UTILS/Error";

export default function Room(props) {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.rooms);
    const [room, setRoom] = useState("");
    const socket = useSelector(state => state.socket);

    const checkUsername = new RegExp(
        '^([A-Za-z0-9]{1,20})$'
    );

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
        else if (!checkUsername.test(room)) {
            setRoom('')
            dispatch(setError("room name should be alphanumeric and length less than 20!"))
        }
        else {
            setRoom("")
            if (socket) {
                socket.emit("create room", room)
                socket.emit("list room")
            }
        }
    }

    const joinRoom = (name) => {
        if (socket) {
            socket.emit("join room", name)
        }
    }

    return (
        <div className="rooms">
            <div className="header-online">
                Rooms
            </div>
            <div className="rooms-group">
                {rooms?.map((item, index) => (
                    <div key={index} className="user-online">
                        {item}
                        <div
                            key={"button-" + index}
                            className="join-room"
                            onClick={() => joinRoom(item)}
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