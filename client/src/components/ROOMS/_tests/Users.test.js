import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Users from '../Users';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Users />", () => {

    test('test for no user online', () => {
        const initialState = {
            users: []
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Users />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        let element = screen.getByText('0 users online');
        expect(element).toBeInTheDocument();
    });

    test('test for exist users online', () => {
        const initialState = {
            users: ['kamal', 'kbahrar']
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Users />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        let element = screen.getByText('2 users online');
        expect(element).toBeInTheDocument();
        element = screen.getByText('kamal');
        expect(element).toBeInTheDocument();
    });
})