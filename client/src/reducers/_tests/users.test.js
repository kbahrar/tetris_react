import usersReducer from '../users-reducer';
import {USERS} from '../../actions'

describe('users reducer test', () => {
    test('test new users', () => {
        const rooms = ['room', 'room2']
        expect(usersReducer(undefined, {type: USERS, payload: rooms}))
            .toEqual(rooms)
    });
})