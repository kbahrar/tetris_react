import { ROOM, EXIT_ROOM, MSGROOM } from "../actions";

const roomReducer = (state = null, action) => {
    switch (action.type) {
        case ROOM:
            return action.payload
        case MSGROOM:
            if (state)
                return {...state, messages: [...state.messages, action.payload]}
            else
                return false
        case EXIT_ROOM:
            return false
        default:
            return state
    }
}

export default roomReducer