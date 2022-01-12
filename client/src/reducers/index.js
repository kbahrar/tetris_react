import { combineReducers } from 'redux'
import gameReducer from './game-reducer'
import authReducer from './auth-reducer'

const reducers = combineReducers({
    game: gameReducer,
    auth: authReducer
})

export default reducers