import {
    defaultState, nextRotation, canMoveTo, addBlockToGrid, checkRows, randomShape
} from '../utils'
import {
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE, PAUSE, RESUME, RESTART, DROP
} from "../actions"

const gameReducer = (state = defaultState(), action) => {
    const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state

    const addInGrid = (y) => {
        const obj = addBlockToGrid(shape, grid, x, y, rotation)
        const newGrid = obj.grid
        const gameOver = obj.gameOver

        if (gameOver) {
            const newState = { ...state }
            newState.shape = 0
            newState.grid = newGrid
            return { ...state, gameOver: true }
        }

        const newState = defaultState()
        newState.grid = newGrid
        newState.shape = nextShape
        newState.nextShape = randomShape()
        newState.score = score
        newState.isRunning = isRunning

        // TODO: check and set level
        newState.score = score + checkRows(newGrid)

        return newState
    }

    const moveDown = () => {
        const maybeY = y + 1
        if (canMoveTo(shape, grid, x, maybeY, rotation)) {
            return { ...state, y: maybeY }
        }

        return addInGrid(y)
    }

    const drop = () => {
        var maybeY = y + 1
        while (canMoveTo(shape, grid, x, maybeY, rotation)) {
            maybeY++
        }
        maybeY -= 1
        return addInGrid(maybeY)
    }

    switch (action.type) {
        case ROTATE:
            const newRotation = nextRotation(shape, rotation)
            if (canMoveTo(shape, grid, x, y, newRotation)) {
                return { ...state, rotation: newRotation }
            }
            return state

        case MOVE_RIGHT:
            if (canMoveTo(shape, grid, x + 1, y, rotation)) {
                return { ...state, x: x + 1 }
            }
            return state

        case MOVE_LEFT:
            if (canMoveTo(shape, grid, x - 1, y, rotation)) {
                return { ...state, x: x - 1 }
            }
            return state

        case MOVE_DOWN:
            return moveDown()

        case RESUME:
            return { ...state, isRunning: true }

        case PAUSE:
            return { ...state, isRunning: false }

        case DROP:
            return drop()

        case RESTART:
            return defaultState()

        default:
            return state
    }
}

export default gameReducer