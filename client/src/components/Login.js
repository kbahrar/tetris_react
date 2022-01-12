import React from "react";
import { useState } from "react";
import { authLogin } from "../actions"; 
import { useDispatch } from 'react-redux'

export default function Login (props) {
    const [username, setUserName] = useState("");
    const [error, setError] = useState(["none", ""]);
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
            dispatch(authLogin(username))
            setError(["none", ""])
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
            <span display={error[0]} className="error-span">{error[1]}</span>
        </div>
    )
}