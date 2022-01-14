import { combineReducers } from 'redux'
import gameReducer from './game-reducer'
import authReducer from './auth-reducer'
import socketReducer from './socket_reducer'

const reducers = combineReducers({
    game: gameReducer,
    auth: authReducer,
    socket: socketReducer
})

export default reducers