import { SOCKET_CONNECT } from "../actions";

const socketReducer = (state = null, action) => {
    switch (action.type) {
        case SOCKET_CONNECT:
            return action.payload
        default:
            return state
    }
}

export default socketReducer