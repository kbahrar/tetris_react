import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Select from '../Select';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByRole } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

test('test for select item', () => {
    const initialState = {}
    const store = mockStore(initialState)
    const { container } = render(
        <Provider store={store}>
            <Select />
        </Provider>
    );
    expect(container).not.toBeEmptyDOMElement();
    let select = screen.getByRole('select');
    expect(select).toBeInTheDocument();
});

test('test for select options length', () => {
    const initialState = {
        room: {
            players: ['kamal', 'kbahrar', 'koko']
        }
    }
    const store = mockStore(initialState)
    const { container } = render(
        <Provider store={store}>
            <Select />
        </Provider>
    );

    expect(screen.getAllByRole('option').length).toBe(3)
});

test('test for select option value', () => {
    const initialState = {
        room: {
            players: ['kamal', 'kbahrar', 'koko']
        }
    }
    const store = mockStore(initialState)
    const { container } = render(
        <Provider store={store}>
            <Select />
        </Provider>
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByRole('option', { name: 'kamal' }).selected).toBe(true);
});

test('test for change select option value', () => {
    const initialState = {
        room: {
            players: ['kamal', 'kbahrar', 'koko']
        }
    }
    const store = mockStore(initialState)
    const { container } = render(
        <Provider store={store}>
            <Select />
        </Provider>
    );
    expect(container).not.toBeEmptyDOMElement();

    fireEvent.change(
        getByRole(container, 'select'),
        {target: {value: 'kbahrar'}}
    )
    expect(screen.getByRole('option', { name: 'kbahrar' }).selected).toBe(true)

});