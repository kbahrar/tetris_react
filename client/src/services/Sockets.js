import { io } from "socket.io-client";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { connectSocket } from "../actions"

function Sockets(props) {
    const ENDPOINT = "http://localhost:5000"
    const [socket, setSocket] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io(ENDPOINT)
        setSocket(socket)
        dispatch(connectSocket(socket))
    }, []);

    return props.children;
}

export default Sockets