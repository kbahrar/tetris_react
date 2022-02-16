import authReducer from '../auth-reducer'
import { AUTH_LOGIN, ADDOP, LOGOUT } from '../../actions'

describe('auth reducer test', () => {
    test('test login', () => {
        expect(authReducer(undefined, {type: AUTH_LOGIN, payload: 'kbahrar'}))
            .toEqual('kbahrar')
    });

    test('test add oponent', () => {
        expect(authReducer({name: 'kamal'}, {type: ADDOP, payload: 'kbahrar'}))
            .toEqual({
                name: 'kamal',
                opponent: 'kbahrar'
            })
    });

    test('test logout', () => {
        expect(authReducer({name: 'kamal'}, {type: LOGOUT}))
            .toEqual(false)
    });
})
