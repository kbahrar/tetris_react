import {
    defaultState
} from '../utils'
import {
    RESTART, UPDATE, CANRESTART
} from "../actions"

const gameReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case RESTART:
            return defaultState()
        
        case UPDATE:
            return action.payload

        case CANRESTART:
            return {...state, winner: action.payload, canRestart: true}

        default:
            return state
    }
}

export default gameReducer