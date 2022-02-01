import { USERS } from "../actions";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case USERS:
            return action.payload
        default:
            return state
    }
}

export default usersReducer