import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { pause, restart, resume } from "../../actions"

export default function ScoreBoard(props) {
    const dispatch = useDispatch()
    const game = useSelector((state) => state.game)
    const { score, isRunning, gameOver } = game

    const togglePlay = (event) => {
        if (gameOver) { return }
        if (isRunning) {
            dispatch(pause())
        } else {
            dispatch(resume())
        }
    }

    return (
        <div className="score-board">
            <div className="info-dev">Score: {score}</div>
            <div className="info-dev">Level: 1</div>
            <div className="controls">
                <button className="control-button" onClick={togglePlay}>
                    {isRunning ? 'Pause' : 'Play'}
                </button>
                <button className="control-button" onClick={(e) => {
                    dispatch(restart())
                }}>
                    Restart
                </button>
            </div>
        </div >
    )
}