import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    authLogin,
    setRooms,
    setError,
    removeError,
    setUsers,
    joinRoom,
    setMsgRoom,
    setMsgs,
    updateData
} from "../actions"

function Sockets(props) {
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket) {
            socket.on("connected", (player) => {
                dispatch(removeError())
                dispatch(authLogin(player))
                socket.emit('list room')
            })

            socket.on("list room", (rooms) => {
                dispatch(setRooms(rooms))
            })

            socket.on("room joined", (room) => {
                dispatch(joinRoom(room))
            })

            socket.on("error", (msg) => {
                dispatch(setError(msg))
            })

            socket.on("users", (users) => {
                dispatch(setUsers(users))
            })

            socket.on('msg room', (msg) => {
                dispatch(setMsgRoom(msg))
            })

            socket.on('msg game', (msg) => {
                dispatch(setMsgs(msg))
            })

            socket.on('game started', (data) => {
                dispatch(updateData(data))
            })

            socket.on('piece moved', (data) => {
                dispatch(updateData(data))
            })
        }
    }, [socket]);
    

    return props.children;
}

export default Sockets