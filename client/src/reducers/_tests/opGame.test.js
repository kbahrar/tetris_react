import opGameReducer from '../opGame-reducer';
import { UPDATEOP, RESETOP } from '../../actions'
import { defaultState } from '../../utils';

describe('oponnent game reducer test', () => {
    test('test update data', () => {
        const game = defaultState()
        game.winner = 'kamal'
        game.canRestart = true
        expect(opGameReducer(undefined, {type: UPDATEOP, payload: game}))
            .toEqual(game)
    });

    test('test reset data', () => {
        const game = defaultState()
        game.winner = 'kamal'
        game.canRestart = true
        expect(opGameReducer(game, {type: RESETOP}))
            .toEqual(defaultState())
    });
})