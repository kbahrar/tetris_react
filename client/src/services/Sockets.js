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
    updateData,
    updateDataOp,
    canRestart
} from "../actions"

function Sockets(props) {
    const socket = useSelector((state) => state.socket);
    const auth = useSelector((state) => state.auth);
    const opponent = useSelector(state => state.auth?.opponent)
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket) {
            console.log("THERE");
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

            socket.on('player exited', () => {
                socket.emit('get room')
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('piece moved', (data, player) => {
                if (auth?.name === player)
                    dispatch(updateData(data))
                else if (opponent === player)
                    dispatch(updateDataOp(data))
            })

            socket.on('win game', (data, player) => {
                dispatch(canRestart(player))
                if (auth?.name === player)
                    dispatch(updateData(data))
            })

        }
        return () => {
            if (socket) {
                socket.off('piece moved')
                socket.off('win game')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, auth, opponent]);
    
    return props.children;
}

export default Sockets