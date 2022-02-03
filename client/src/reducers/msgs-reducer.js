import { MSGS } from "../actions";

const msgsReducer = (state = [], action) => {
    switch (action.type) {
        case MSGS:
            return [...state, action.payload]
        default:
            return state
    }
}

export default msgsReducer