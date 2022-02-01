import { ERROR, NoERROR } from "../actions";

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case ERROR:
            return action.payload
        case NoERROR:
            return null
        default:
            return state
    }
}

export default errorReducer