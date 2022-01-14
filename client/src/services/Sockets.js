import { io } from "socket.io-client";
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {connectSocket} from "../actions"

function Sockets () {
    const ENDPOINT = "http://localhost:5000"
    const [socket, setSocket] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
		const socket = io(ENDPOINT)
        setSocket(socket)
        dispatch(connectSocket(socket))
	}, []);

    useEffect(() => {
        if (auth) {
            console.log(socket)
            socket.on("login", (arg) => {
                console.log(arg)
            })
            socket.emit("login", [auth, socket.id])
        }
        return ""
    }, [auth])

    return "";
}

export default Sockets