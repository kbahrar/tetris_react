import { ROOM, EXIT_ROOM } from "../actions";

const roomReducer = (state = null, action) => {
    switch (action.type) {
        case ROOM:
            return action.payload
        case EXIT_ROOM:
            return false
        default:
            return state
    }
}

export default roomReducer