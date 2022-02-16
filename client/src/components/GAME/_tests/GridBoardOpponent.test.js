import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import GridBoardOpponent from '../GridBoardOpponent';
import React from 'react';
import configureStore from 'redux-mock-store'
import { gridDefault } from '../../../utils';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<GridBoardOpponent />", () => {

    test('test for initial grid board oponent', () => {
        const initialState = {
            opGame: {
                grid: gridDefault(),
                shape: 0,
                rotation: 0,
                x: 0,
                y: -2,
                gameOver: false,
                isWin: false,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoardOpponent />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(200)
    });

    test('test for there is a shape in grid board oponent', () => {
        const initialState = {
            opGame: {
                grid: gridDefault(),
                shape: 1,
                rotation: 0,
                yShadow: -2,
                x: 5,
                y: 2,
                gameOver: false,
                isWin: false,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoardOpponent />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(196)

        expect(container.getElementsByClassName('color-1').length).toBe(4)
    });

    test('test for when oponent win', () => {
        const initialState = {
            opGame: {
                grid: gridDefault(),
                shape: 1,
                rotation: 0,
                yShadow: -2,
                x: 5,
                y: 2,
                gameOver: false,
                isWin: true,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoardOpponent />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(screen.getByText(/Winner/i)).toBeInTheDocument();
    });

    test('test for when oponent game over', () => {
        const initialState = {
            opGame: {
                grid: gridDefault(),
                shape: 1,
                rotation: 0,
                yShadow: -2,
                x: 5,
                y: 2,
                gameOver: true,
                isWin: false,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoardOpponent />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
    });

    
})