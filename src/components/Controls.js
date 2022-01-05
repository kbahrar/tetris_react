import React from "react";
import { useSelector, useDispatch, } from 'react-redux'
import { moveDown, moveLeft, moveRight, rotate, drop } from '../actions'

export default function Controls(props) {
    const dispatch = useDispatch()
    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)
    return (
        <div className="controls">
            <button disabled={!isRunning || gameOver} className="control-button" onClick={(e) => {
                if (!isRunning || gameOver) {
                    // e.preventDefault
                    return
                }
                dispatch(moveLeft())
            }}>Left</button>
            <button  disabled={!isRunning || gameOver} className="control-button" onClick={(e) => {
                if (!isRunning || gameOver) {
                    // e.preventDefault
                    return
                }
                dispatch(moveRight())
            }}>Right</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={(e) => {
                if (!isRunning || gameOver) {
                    // e.preventDefault
                    return
                }
                dispatch(rotate())
            }}>Rotate</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={(e) => {
                if (!isRunning || gameOver) {
                    // e.preventDefault
                    return
                }
                dispatch(moveDown())
            }}>Down</button>
            <button disabled={!isRunning || gameOver} className="control-button" onClick={(e) => {
                if (!isRunning || gameOver) {
                    // e.preventDefault
                    return
                }
                dispatch(drop())
            }}>Drop</button>
        </div>
    )
}