import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom } from "../../actions";

export default function Header(props) {
    const auth = useSelector((state) => state.auth)
    const room = useSelector((state) => state.room)
    const socket = useSelector((state) => state.socket)
    const dispatch = useDispatch()

    const exit = () => {
        if (socket) {
            socket.emit('exit room')
            dispatch(joinRoom(null))
        }
    }

    return (
        <header className="App-header">
            {room ?
                <button className="control-button" onClick={exit}>EXIT</button>
                :
                <></>
            }
            <h1 className="App-title">Tetris</h1>
            {auth?.name ?
                <h5>{auth?.name}</h5>
                :
                <></>
            }
        </header>
    )
}