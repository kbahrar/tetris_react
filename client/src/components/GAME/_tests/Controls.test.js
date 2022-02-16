import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Controls from '../Controls';
import React from 'react';
import configureStore from 'redux-mock-store'
import { findByText, fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Controls />", () => {
    const keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ESPACE: 32
    }
    Object.freeze(keys)

    const socketTest = {
        emit: (event) => {
            return event
        }
    }

    test('test for key UP', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)
        
        fireEvent.click(
            getByText(container, 'Rotate')
        )

        fireEvent.keyDown(
            container,
            {
                keyCode: keys.UP
            }
        )
    });

    test('test for key DOWN', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)
        
        fireEvent.click(
            getByText(container, 'Down')
        )

        fireEvent.keyDown(
            container,
            {
                keyCode: keys.DOWN
            }
        )
    });

    test('test for key LEFT', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)
        
        fireEvent.click(
            getByText(container, 'Left')
        )

        fireEvent.keyDown(
            container,
            {
                keyCode: keys.LEFT
            }
        )
    });

    test('test for key RIGHT', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)
        
        fireEvent.click(
            getByText(container, 'Right')
        )

        fireEvent.keyDown(
            container,
            {
                keyCode: keys.RIGHT
            }
        )
    });

    test('test for key ESPACE', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)
        
        fireEvent.click(
            getByText(container, 'Drop')
        )

        fireEvent.keyDown(
            container,
            {
                keyCode: keys.ESPACE
            }
        )
    });

    test('test for key not exist', () => {
        const initialState = {
            socket: socketTest,
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Controls />
            </Provider>
        );

        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('control-button').length).toBe(5)

        fireEvent.keyDown(
            container,
            {
                keyCode: 50
            }
        )
    });
})