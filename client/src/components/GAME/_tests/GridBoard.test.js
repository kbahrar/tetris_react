import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import GridBoard from '../GridBoard';
import React from 'react';
import configureStore from 'redux-mock-store'
import { gridDefault } from '../../../utils';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<GridBoard />", () => {

    test('test for initial grid board', () => {
        const initialState = {
            game: {
                grid: gridDefault(),
                shape: 0,
                rotation: 0,
                yShadow: -2,
                x: 0,
                y: -2,
                gameOver: false,
                isWin: false,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoard />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(200)
    });

    test('test for there is a shape in grid board', () => {
        const initialState = {
            game: {
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
                <GridBoard />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(196)

        expect(container.getElementsByClassName('color-1').length).toBe(4)
    });

    test('test for there is a shape and a shadow in grid board', () => {
        const initialState = {
            game: {
                grid: gridDefault(),
                shape: 1,
                rotation: 0,
                yShadow: 18,
                x: 5,
                y: 2,
                gameOver: false,
                isWin: false,
            },
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <GridBoard />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(192)

        expect(container.getElementsByClassName('color-1').length).toBe(4)

        expect(container.getElementsByClassName('color-1-shadow').length).toBe(4)
    });
})