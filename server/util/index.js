const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// random shape
const randomShape = () => {
	return random(1, shapes.length - 1)
}

// next rotation
const nextRotation = (shape, rotation) => {
	return (rotation + 1) % shapes[shape].length
}

// moves checker
const canMoveTo = (shape, grid, x, y, rotation) => {
	const currentShape = shapes[shape][rotation]

	if (!currentShape)
		return false
	for (let row = 0; row < currentShape.length; row++) {
		for (let col = 0; col < currentShape[row].length; col++) {
			if (currentShape[row][col] !== 0) {
				const proposedX = col + x
				const proposedY = row + y
				if (proposedY < 0 && proposedX >= 0 && proposedX <= 9) {
					continue
				}

				const possibleRow = grid[proposedY]; // 7liwa point virgule
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
const addBlockToGrid = (shape, grid, x, y, rotation) => {
	let blockoffGrid = false
	const block = shapes[shape][rotation]
	const newGrid = [...grid]

	if (!block)
		return { grid, gameOver: false }
	for (let row = 0; row < block.length; row++) {
		for (let col = 0; col < block[row].length; col++) {
			if (block[row][col]) {
				const yIndex = row + y

				if (yIndex < 0) {
					blockoffGrid = true
					break;
				}
				else {
					newGrid[row + y][col + x] = shape
				}
			}
		}
	}

	return { grid: newGrid, gameOver: blockoffGrid }
}

const shapes = [
	// none
	[
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	],

	// I
	[
		[
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0]
		],

		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0]
		]
	],

	// T
	[
		[
			[0, 0, 0, 0],
			[0, 1, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		]
	],

	// L
	[
		[
			[0, 0, 1, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 0, 0],
			[1, 1, 1, 0],
			[1, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		]
	],

	// J
	[
		[
			[1, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0]
		]
	],

	// Z
	[
		[
			[1, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 1, 0],
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 0, 0, 0],
			[1, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[1, 0, 0, 0],
			[0, 0, 0, 0]
		],
	],

	// S
	[
		[
			[0, 1, 1, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[0, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0]	
		],

		[
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0]
		],

		[
			[1, 0, 0, 0],
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]	
		]
	],

	// O
	[
		[
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	]
]

module.exports = { shapes, randomShape, nextRotation, canMoveTo, addBlockToGrid }