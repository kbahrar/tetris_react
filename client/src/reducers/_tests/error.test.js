import errorReducer from '../error-reducer';
import { ERROR, NoERROR } from '../../actions'

describe('error reducer test', () => {
    test('test add error', () => {
        expect(errorReducer(undefined, {type: ERROR, payload: 'error'}))
            .toEqual('error')
    });

    test('test remove error', () => {
        expect(errorReducer('error', {type: NoERROR}))
            .toEqual(null)
    });
})