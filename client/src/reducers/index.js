import { combineReducers } from 'redux'
import gameReducer from './game-reducer'
import authReducer from './auth-reducer'
import socketReducer from './socket_reducer'
import roomReducer from './room-reducer'
import roomsReducer from './rooms-reducer'
import errorReducer from './error-reducer'
import usersReducer from './users-reducer'
import msgsReducer from './msgs-reducer'

const reducers = combineReducers({
    game: gameReducer,
    auth: authReducer,
    socket: socketReducer,
    room: roomReducer,
    rooms: roomsReducer,
    error: errorReducer,
    users: usersReducer,
    messages: msgsReducer
})

export default reducers