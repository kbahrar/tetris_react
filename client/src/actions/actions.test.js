import { 
    RESTART,
    restart,
    UPDATE,
    updateData,
    UPDATEOP,
    updateDataOp,
    CANRESTART,
    canRestart,
    AUTH_LOGIN,
    authLogin,
    LOGOUT,
    logout,
    USERS,
    setUsers,
    MSGS,
    setMsgs,
    MSGROOM,
    setMsgRoom,
    ROOMS,
    setRooms
} from '../actions'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('reducers actions test', () => {
    // game actions
    test('test restart', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(restart())
    
        const actions = store.getActions()
        const expectedPayload = { type: RESTART }
        expect(actions).toEqual([expectedPayload])
    });

    test('test update player data', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(updateData('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: UPDATE, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });

    test('test update oponnent data', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(updateDataOp('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: UPDATEOP, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });

    test('test can restart', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(canRestart('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: CANRESTART, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });
    
    // auth actions
    test('test login', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(authLogin('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: AUTH_LOGIN, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });

    test('test logout', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(logout())
    
        const actions = store.getActions()
        const expectedPayload = { type: LOGOUT }
        expect(actions).toEqual([expectedPayload])
    });
    
    // users
    test('set users', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(setUsers('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: USERS, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });
    
    // messages
    test('set messages', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(setMsgs('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: MSGS, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });
    
    // rooms
    test('set messages room', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(setMsgRoom('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: MSGROOM, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });

    test('set rooms', () => {
        const initialState = {}
        const store = mockStore(initialState)
    
        store.dispatch(setRooms('data'))
    
        const actions = store.getActions()
        const expectedPayload = { type: ROOMS, payload: 'data' }
        expect(actions).toEqual([expectedPayload])
    });
})
