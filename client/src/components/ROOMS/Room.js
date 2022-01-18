import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux'

export default function Room(props) {
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState("")
    const [error, setError] = useState(["none", ""]);
    const socket = useSelector(state => state.socket)
    const auth = useSelector(state => state.auth)

    React.useEffect(() => {
        if (socket) {
            socket.emit("list room")

            socket.on("list room", data => {
                setRooms(data)
            })

            return () => {
                socket.off("list room")
            }
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
            socket.emit("create room", [room, auth], (res) => {
                if (res.status == "ok")
                    console.log(res)
                else {
                    setError(["block", "room name already exist !"])
                }
            })
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
            <span display={error[0]} className="error-span">{error[1]}</span>
        </div>
    )
}