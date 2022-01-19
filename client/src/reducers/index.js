import { combineReducers } from 'redux'
import gameReducer from './game-reducer'
import authReducer from './auth-reducer'
import socketReducer from './socket_reducer'
import roomReducer from './room-reducer'

const reducers = combineReducers({
    game: gameReducer,
    auth: authReducer,
    socket: socketReducer,
    room: roomReducer
})

export default reducers