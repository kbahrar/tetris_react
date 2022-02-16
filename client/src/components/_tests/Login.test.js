import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Login from '../Login';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Login />", () => {
    test('test for initial login router', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        const linkElement = screen.getByText(/User Name/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('test for typing in input', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        fireEvent.change(
            getByPlaceholderText(container, 'enter your username'),
            {target: {value: 'kamal'}}
        )

        expect(screen.getByPlaceholderText('enter your username').value).toBe('kamal')
    });

    test('test for submit empty username', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();

        fireEvent.click(
            getByText(container, 'ENTER'),
        )
    });

    test('test for submit an username', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(container).not.toBeEmptyDOMElement();
        
        fireEvent.change(
            getByPlaceholderText(container, 'enter your username'),
            {target: {value: 'kamal'}}
        )

        expect(screen.getByPlaceholderText('enter your username').value).toBe('kamal')
        
        fireEvent.click(
            getByText(container, 'ENTER'),
        )
    });

})