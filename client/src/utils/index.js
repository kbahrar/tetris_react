export const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// return default grid
export const gridDefault = () => {
	const rows = 20
	const cols = 10

	const array = Array.from({ length: rows }, () => Array(cols).fill(0))

	return array
}

// random shape
export const randomShape = () => {
	return random(1, shapes.length - 1)
}

// default state for the game
export const defaultState = () => {
	return {
		grid: gridDefault(),
		shape: 0,
		rotation: 0,
		x: 5,
		y: -2,
		nextShape: 0,
		isRunning: false,
		score: 0,
		speed: 1000,
		gameOver: false,
		yShadow: -2,
		isWin: false,
		canRestart: false,
		winner: null
	}
}

// next rotation for a shape
export const nextRotation = (shape, rotation) => {
	return (rotation + 1) % shapes[shape].length
}

// moves checker
export const canMoveTo = (shape, grid, x, y, rotation) => {
	const currentShape = shapes[shape][rotation]

	for (let row = 0; row < currentShape.length; row++) {
		for (let col = 0; col < currentShape[row].length; col++) {
			if (currentShape[row][col] !== 0) {
				const proposedX = col + x
				const proposedY = row + y
				if (proposedY < 0) {
					continue
				}

				const possibleRow = grid[proposedY]
				if (possibleRow) {
					if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0)
						return false
				}
				else {
					return false
				}
			}
		}
	}
	return true
}

// adds current shape to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
	let blockoffGrid = false
	const block = shapes[shape][rotation]
	const newGrid = [...grid]

	for (let row = 0; row < block.length; row++) {
		for (let col = 0; col < block[row].length; col++) {
			if (block[row][col]) {
				const yIndex = row + y

				if (yIndex < 0) {
					blockoffGrid = true
				}
				else {
					newGrid[row + y][col + x] = shape
				}
			}
		}
	}
	return {grid: newGrid, gameOver: blockoffGrid}
}

// Points
export const checkRows = (grid) => {
	const points = [0, 40, 100, 300, 1200]
	let completedRows = 0

	for (let row = 0; row < grid.length; row++) {
		if (grid[row].indexOf(0) === -1) {
			completedRows++
			grid.splice(row, 1)
			grid.unshift(Array(10).fill(0))
		}
	}

	return points[completedRows]
}

// shapes and rotations
export const shapes = [
	// none
	[[[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]]],

	// I
	[[[0, 0, 0, 0],
	[1, 1, 1, 1],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0]]],

	// T
	[[[0, 0, 0, 0],
	[1, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[1, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[1, 1, 1, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]]],

	// L
	[[[0, 0, 0, 0],
	[1, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 0, 0, 0]],

	[[1, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]],

	[[0, 0, 1, 0],
	[1, 1, 1, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0]]],

	// J
	[[[1, 0, 0, 0],
	[1, 1, 1, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]],

	[[0, 0, 0, 0],
	[1, 1, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[0, 1, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 0]]],

	// Z
	[[[0, 0, 0, 0],
	[1, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0]],

	[[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]]],

	// S
	[[[0, 0, 0, 0],
	[0, 1, 1, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 0]],

	[[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 0]]],

	// O
	[[[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]]]
]