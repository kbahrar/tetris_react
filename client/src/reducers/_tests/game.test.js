import gameReducer from '../game-reducer';
import {  RESTART, UPDATE, CANRESTART } from '../../actions'
import { defaultState } from '../../utils';

describe('game reducer test', () => {
    test('test restart', () => {
        expect(gameReducer(undefined, {type: RESTART}))
            .toEqual(defaultState())
    });

    test('test update', () => {
        expect(gameReducer(undefined, {type: UPDATE, payload: 'kbahrar'}))
            .toEqual('kbahrar')
    });

    test('test can restart', () => {
        const game = defaultState()
        game.winner = 'kamal'
        game.canRestart = true
        expect(gameReducer(undefined, {type: CANRESTART, payload: 'kamal'}))
            .toEqual(game)
    });
})