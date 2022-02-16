import roomsReducer from '../rooms-reducer';
import {ROOMS} from '../../actions'

describe('rooms reducer test', () => {
    test('test new rooms', () => {
        const rooms = ['room', 'room2']
        expect(roomsReducer(undefined, {type: ROOMS, payload: rooms}))
            .toEqual(rooms)
    });
})