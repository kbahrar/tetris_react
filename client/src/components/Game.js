import React from 'react'
import GridBoard from './GAME/GridBoard'
import NextBlock from './GAME/NextBlock'
import ScoreBoard from './GAME/ScoreBoard'
import Controls from './GAME/Controls'
import MessagePopup from './GAME/MessagePopup'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { io } from "socket.io-client";
import { connectSocket, setError } from '../actions'

export default function Game() {
    const ENDPOINT = "http://localhost:5000"
    const dispatch = useDispatch()
    const socket = useSelector(state => state.socket)
    const auth = useSelector(state => state.auth)
    const room = useSelector(state => state.room)

    const {newRoom, username} = useParams()

    React.useEffect(() => {
        if (!auth?.name) {
            const newSocket = io(ENDPOINT, {
                withCredentials: true,
            })
            document.cookie = `name=${username}`
            dispatch(connectSocket(newSocket))
            if (!socket.connected)
                dispatch(setError("failed to connect"))
        }

        if (!room) {
            if (socket)
                socket.emit("join room", newRoom)
        }
        
        return () => {
            if (socket)
                socket.emit('exit room')
        };
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