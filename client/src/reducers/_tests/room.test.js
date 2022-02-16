import roomReducer from '../room-reducer';
import { ROOM, EXIT_ROOM, MSGROOM } from '../../actions'

describe('room reducer test', () => {
    test('test join room', () => {
        const room = {
            name: 'room',
            host: 'kamal',
            messages: []
        }
        expect(roomReducer(undefined, {type: ROOM, payload: room}))
            .toEqual(room)
    });

    test('test exit room', () => {
        const room = {
            name: 'room',
            host: 'kamal',
            messages: []
        }
        expect(roomReducer(room, {type: EXIT_ROOM}))
            .toEqual(false)
    });

    test('test receive msgs', () => {
        const room = {
            name: 'room',
            host: 'kamal',
            messages: []
        }

        const newRoom = {
            name: 'room',
            host: 'kamal',
            messages: ['hello']
        }

        expect(roomReducer(room, {type: MSGROOM, payload: 'hello'}))
            .toEqual(newRoom)

        expect(roomReducer(null, {type: MSGROOM, payload: 'hello'}))
            .toEqual(false)
    });
})