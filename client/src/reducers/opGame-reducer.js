import {
    defaultState
} from '../utils'
import {
    UPDATEOP, RESETOP
} from "../actions"

const opGameReducer = (state = defaultState(), action) => {
    switch (action.type) {
        case RESETOP:
            return defaultState()
        
        case UPDATEOP:
            return action.payload

        default:
            return state
    }
}

export default opGameReducer