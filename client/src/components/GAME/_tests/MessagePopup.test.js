import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import MessagePopup from '../MessagePopup';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<MessagePopup />", () => {

    test('test for no message', () => {
        const initialState = {
            game: {
                gameOver: false,
                isRunning: true
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <MessagePopup />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
    });

    test('test for when game still not started', () => {
        const initialState = {
            game: {
                gameOver: false,
                isRunning: false
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <MessagePopup />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/Waiting to Start !/i)
        expect(element).toBeInTheDocument();
    });

    test('test for when game over', () => {
        const initialState = {
            game: {
                gameOver: true,
                isRunning: false
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <MessagePopup />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/Game Over/i)
        expect(element).toBeInTheDocument();
    });

    test('test for other winner', () => {
        const initialState = {
            game: {
                winner: 'kamal',
                gameOver: true,
                isRunning: false
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <MessagePopup />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/kamal/i)
        expect(element).toBeInTheDocument();
    });

    test('test for you are the winner', () => {
        const initialState = {
            auth: {
                name: 'kamal'
            },
            game: {
                winner: 'kamal',
                gameOver: true,
                isRunning: false
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <MessagePopup />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/YOU ARE THE WINNER !/i)
        expect(element).toBeInTheDocument();
    });
})