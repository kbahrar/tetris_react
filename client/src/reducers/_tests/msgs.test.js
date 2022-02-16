import msgsReducer from '../msgs-reducer';
import { MSGS } from '../../actions'

describe('msgs reducer test', () => {
    test('test add msg', () => {
        expect(msgsReducer(['kamal'], {type: MSGS, payload: 'bahrar'}))
            .toEqual(['kamal', 'bahrar'])
    });
})