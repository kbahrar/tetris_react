import React from 'react'
import GridBoard from './GAME/GridBoard'
import NextBlock from './GAME/NextBlock'
import ScoreBoard from './GAME/ScoreBoard'
import Controls from './GAME/Controls'
import MessagePopup from './GAME/MessagePopup'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client";
import { connectSocket, setError, joinRoom, restart } from '../actions'

export default function Game() {
    const ENDPOINT = "http://localhost:5000/";
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socket)
    const existRoom = useSelector(state => state.room)

    const {room, username} = useParams()

    React.useEffect(() => {
        if (!socket) {
            const newSocket = io(ENDPOINT, {
                withCredentials: true,
            })
            document.cookie = `name=${username}`
            dispatch(connectSocket(newSocket))
            if (newSocket)
                newSocket.emit("join room", room)
            if (!newSocket?.connected)
                dispatch(setError("failed to connect"))
        }
        else if (!existRoom) {
            socket.emit("join room", room)
        }
        
        return () => {
            if (socket) {
                socket.emit('exit room')
                dispatch(joinRoom(null))
                dispatch(restart())
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <GridBoard />
            <NextBlock />
            <ScoreBoard />
            <Controls />
            <MessagePopup />
        </>
    )
}