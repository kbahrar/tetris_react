import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Room from '../Room';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Room />", () => {

    test('test for room default devs', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Room />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        let element = screen.getByText('Rooms');
        expect(element).toBeInTheDocument();
    
        element = screen.getByPlaceholderText('room name')
        expect(element).toBeInTheDocument();
    });
    
    test('test for rooms exist', () => {
        const initialState = {
            rooms: [
                'haha',
                'ohMyRoom'
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Room />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        expect(screen.getAllByText(/JOIN/i).length).toBe(2)
    });
    
    test('test for writing in input', () => {
        const initialState = {
            rooms: [
                'haha',
                'ohMyRoom'
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Room />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        fireEvent.change(
            getByPlaceholderText(container, 'room name'),
            {target: {value: 'kbahrar'}}
        )

        expect(screen.getByPlaceholderText('room name').value).toBe('kbahrar')
    });

    test('test for click to add room', () => {
        const initialState = {
            rooms: [
                'haha',
                'ohMyRoom'
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Room />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        fireEvent.change(
            getByPlaceholderText(container, 'room name'),
            {target: {value: 'kbahrar'}}
        )

        expect(screen.getByPlaceholderText('room name').value).toBe('kbahrar')

        fireEvent.click(
            getByText(container, 'CREATE ROOM'),
        )
        expect(screen.getByPlaceholderText('room name').value).not.toBe('kbahrar')
    });
})