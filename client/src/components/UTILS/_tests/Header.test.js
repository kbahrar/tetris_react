import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Header from '../Header';
import React from 'react';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store'
import { fireEvent, getByText } from '@testing-library/dom';

import reducers from '../../../reducers';

const initStore = createStore(
    reducers
)

const middlewares = []
const mockStore = configureStore(middlewares)

test('test for just the tetris title', () => {
    const { container } = render(
        <Provider store={initStore}>
            <Header />
        </Provider>
    );
    expect(container).not.toBeEmptyDOMElement();
    let linkElement = screen.getByText(/Tetris/i);
    expect(linkElement).toBeInTheDocument();
});

test('test for username', () => {
    const initialState = {
        auth: {
            name: 'kamal',
        }
    }
    const store = mockStore(initialState)

    const { container } = render(
        <Provider store={store}>
            <Header />
        </Provider>
    );

    let linkElement = screen.getByText(/kamal/i);
    expect(linkElement).toBeInTheDocument();
});

test('test for username joined room', () => {
    const socketTest = {
        emit: (event) => {
            return event
        }
    }

    const initialState = {
        socket: socketTest,
        
        auth: {
            name: 'kamal',
        },

        room: {
            name: 'room'
        }
    }
    const store = mockStore(initialState)

    const { container } = render(
        <Provider store={store}>
            <Header />
        </Provider>
    );

    let linkElement = screen.getByText(/kamal/i);
    let button = screen.getByText(/EXIT/i);
    expect(linkElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.click(
        getByText(container, /EXIT/i)
    )
});