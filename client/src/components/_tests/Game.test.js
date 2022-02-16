import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Game from '../Game';
import React from 'react';
import configureStore from 'redux-mock-store'
import { gridDefault } from '../../utils';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Game />", () => {
    const socketTest = {
        emit: (event) => {
            return event
        }
    }

    test('test for initial game without auth', () => {
        const initialState = {
            game: {
                grid: gridDefault(),
                shape: 0,
                rotation: 0,
                yShadow: -2,
                nextShape: 1,
                x: 0,
                y: -2,
                gameOver: false,
                isWin: false,
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Game />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(212)
    });

    test('test for initial game with auth and without room', () => {
        const initialState = {
            socket: socketTest,
            game: {
                grid: gridDefault(),
                shape: 0,
                rotation: 0,
                yShadow: -2,
                nextShape: 1,
                x: 0,
                y: -2,
                gameOver: false,
                isWin: false,
            },
            auth: {
                name: 'kamal'
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Game />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        expect(container.getElementsByClassName('color-0').length).toBe(212)
    });
})