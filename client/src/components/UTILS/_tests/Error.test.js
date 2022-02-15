import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Error from '../Error';
import React from 'react';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store'

import reducers from '../../../reducers';

const initStore = createStore(
    reducers
)

const middlewares = []
const mockStore = configureStore(middlewares)

test('test no error', () => {
    const { container } = render(
        <Provider store={initStore}>
            <Error />
        </Provider>
    );
    expect(container).toBeEmptyDOMElement();
});

test('test exist error', async () => {
    const initialState = {
        error: 'kamal'
    }
    const store = mockStore(initialState)

    // store.dispatch(setError('kamal'))

    // const actions = store.getActions()
    // const expectedPayload = { type: ERROR, payload: 'kamal' }
    // expect(actions).toEqual([expectedPayload])
    // console.log(store.getState())
    const { container } = render(
        <Provider store={store}>
            <Error />
        </Provider>
    );

    let linkElement = screen.getByText(/kamal/i);
    expect(linkElement).toBeInTheDocument();
});