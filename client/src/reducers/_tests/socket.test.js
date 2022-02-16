import socketReducer from '../socket_reducer';
import {SOCKET_CONNECT} from '../../actions'

describe('socket reducer test', () => {
    test('test connect socket', () => {
        const rooms = ['room', 'room2']
        expect(socketReducer(undefined, {type: SOCKET_CONNECT, payload: rooms}))
            .toEqual(rooms)
    });
})