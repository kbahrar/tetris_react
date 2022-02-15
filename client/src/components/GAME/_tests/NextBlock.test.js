import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import NextBlock from '../NextBlock';
import React from 'react';
import configureStore from 'redux-mock-store'
import { gridDefault } from '../../../utils';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<NextBlock />", () => {

    test('test for next block', () => {
        const initialState = {
            game: {
                nextShape: 1,
                room: {
                    players: []
                }
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <NextBlock />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
    });

    test('test for when oponent exist', () => {
        const initialState = {
            game: {
                nextShape: 1,
            },
            opGame: {
                grid: gridDefault(),
                shape: 1,
                x: 2,
                y: 5,
                gameOver: false,
                isWin: false
            },
            room: {
                players: ['kamal', 'bahrar']
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <NextBlock />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
    });
})