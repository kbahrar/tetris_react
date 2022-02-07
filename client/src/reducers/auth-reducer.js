import { AUTH_LOGIN, LOGOUT, ADDOP } from "../actions";

const authReducer = (state = null, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return action.payload
        case ADDOP:
            return {...state, opponent: action.payload}
        case LOGOUT:
            return false
        default:
            return state
    }
}

export default authReducer