import React from "react";
import GridSquare from "./GridSquare";
import { useSelector } from 'react-redux'
import { shapes } from "../../utils";
import Select from "../UTILS/Select";

export default function GridBoardOpo(props) {
	const game = useSelector((state) => state.opGame)
	const { grid, shape, rotation, x, y } = game

	const block = shapes[shape][rotation]
	const blockColor = shape
	const gridSquares = grid?.map((rowArray, row) => {

		return rowArray?.map((square, col) => {

			const blockX = col - x
			const blockY = row - y
			let shadow = false
			let color = square

			if (blockX >= 0 && blockX < block?.length && blockY >= 0 && blockY < block?.length) {
				color = block[blockY][blockX] === 0 ? color : blockColor
			}

			const k = row * grid[0].length + col;

			return <GridSquare
				key={k}
				classe={color > 0 ? 'grid-square-color-opo' : 'grid-square-opo'}
				shadow={shadow}
				color={color} />
		})
	})

	return (
        <div className="opponent-dev">
            <div className="header-opponent">
                Opponent
            </div>
            <Select />
            <div className='grid-board-opponent'>
                {gridSquares}
            </div>
        </div>
	)
}