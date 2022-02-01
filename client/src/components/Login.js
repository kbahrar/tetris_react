import React from "react";
import { useState, useEffect } from "react";
import { authLogin } from "../actions"; 
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { connectSocket } from "../actions"

export default function Login (props) {
    const ENDPOINT = "http://localhost:5000";
    const [username, setUserName] = useState("");
    const [error, setError] = useState(["none", ""]);
    const errorState = useSelector((state) => state.error);
    const dispatch = useDispatch()

    const changeUsername = (e) => {
        setUserName(e.target.value)
    }

    const submit = (e) => {
        if (!username) {
            e.preventDefault()
            setError(["block", "you should enter a username first"])
        }
        else {
            const socket = io(ENDPOINT, {
                withCredentials: true,
            })
            document.cookie = `name=${username}`
            dispatch(connectSocket(socket))
            socket.on("connect_error", (err) => {
                setError(["block", err.message]) // prints the message associated with the error
            });
        }
    }

    useEffect(() => {
        if (errorState)
            setError(["block", errorState]);
        else
            setError(["none", ""]);
    }, [errorState]);
    

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
            <span display={error[0]} className="error-span">{error[1]}</span>
        </div>
    )
}