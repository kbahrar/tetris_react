import { ROOMS } from "../actions";

const roomsReducer = (state = null, action) => {
    switch (action.type) {
        case ROOMS:
            return action.payload
        default:
            return state
    }
}

export default roomsReducer