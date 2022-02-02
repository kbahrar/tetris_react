import { ROOMS } from "../actions";

const roomsReducer = (state = [], action) => {
    switch (action.type) {
        case ROOMS:
            return action.payload
        default:
            return state
    }
}

export default roomsReducer