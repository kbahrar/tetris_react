import React from "react";
import GridSquare from "./GridSquare";
import { useSelector } from 'react-redux'
import { shapes } from "../../utils";

export default function GridBoard(props) {
	const game = useSelector((state) => state.game)
	const { grid, shape, rotation, x, y, yShadow } = game

	const block = shapes[shape][rotation]
	const blockColor = shape

	const gridSquares = grid?.map((rowArray, row) => {

		return rowArray?.map((square, col) => {

			const blockX = col - x
			const blockY = row - y
			const blockYshadow = row - yShadow + 1
			let shadow = false
			let color = square

			if (blockX >= 0 && blockX < block?.length && blockY >= 0 && blockY < block?.length) {
				color = block[blockY][blockX] === 0 ? color : blockColor
			}
			else if (blockX >= 0 && blockX < block?.length && blockYshadow >= 0 && blockYshadow < block?.length) {
				color = block[blockYshadow][blockX] === 0 ? color : blockColor
				shadow = block[blockYshadow][blockX] === 0 ? false : true
			}

			const k = row * grid[0].length + col;

			return <GridSquare
				key={k}
				classe={color > 0 ? 'grid-square-color' : 'grid-square'}
				shadow={shadow}
				color={color} />
		})
	})

	return (
		<div className='grid-board'>
			{gridSquares}
		</div>
	)
}