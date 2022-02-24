import React from "react";
import Error from "./UTILS/Error";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { connectSocket, setError } from "../actions";

export default function Login (props) {
    const ENDPOINT = "http://localhost:5000/";
    const [username, setUserName] = useState("");
    const dispatch = useDispatch()

    const changeUsername = (e) => {
        setUserName(e.target.value)
    }

    const submit = (e) => {
        if (!username) {
            e.preventDefault()
            dispatch(setError("you should enter a username first"))
        }
        else {
            const socket = io(ENDPOINT, {
                withCredentials: true,
            })
            document.cookie = `name=${username}`
            dispatch(connectSocket(socket))
            if (!socket.connected)
                dispatch(setError("failed to connect"))
        }
    }

    return (
        <div className="username-div">
            <label htmlFor="username" className="username-label">
                User Name :
            </label>
            <input
                className="username-input"
                id="username"
                type="text"
                onChange={changeUsername}
                placeholder="enter your username"/>
            <button type="submit" className="submit-button" onClick={submit}>ENTER</button>
            <Error />
        </div>
    )
}