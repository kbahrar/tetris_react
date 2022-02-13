import React from "react";
import GridSquare from "./GridSquare";
import {useSelector} from 'react-redux'
import { shapes } from "../../utils";
import GridBoardOpo from "./GridBoardOpponent";

export default function NextBlock(props) {
    const nextShape = useSelector((state) => state.game.nextShape)
    const room = useSelector((state) => state.room)

    const box = shapes[nextShape][0]
    const color = nextShape

    const grid = box.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return <GridSquare
                key={`${row}${col}`}
                classe={square > 0 ? 'grid-square-color' : 'grid-square'}
                color={square > 0 ? color : square} />
        })
    })

    return (
        <div className="next-block">
            {grid}
            {room?.players?.length > 1 ?
                <GridBoardOpo />
                :
                <></>
            }
        </div>
    )
}