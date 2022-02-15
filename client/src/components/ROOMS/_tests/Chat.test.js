import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import Chat from '../Chat';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<Chat />", () => {

    test('test for chat devs', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        let element = screen.getByText('chat');
        expect(element).toBeInTheDocument();
    
        element = screen.getByPlaceholderText('type message ...')
        expect(element).toBeInTheDocument();
    });
    
    test('test for msg exist', () => {
        const initialState = {
            messages: [
                {
                    sender: 'kamal',
                    msg: 'hi',
                    type: 'normal'
                }
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        expect(screen.getAllByText(/kamal/i).length).toBe(1)
    });
    
    test('test for writing in input', () => {
        const initialState = {
            messages: [
                {
                    sender: 'kamal',
                    msg: 'hi',
                    type: 'normal'
                }
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        fireEvent.change(
            getByPlaceholderText(container, 'type message ...'),
            {target: {value: 'kbahrar'}}
        )

        expect(screen.getByPlaceholderText('type message ...').value).toBe('kbahrar')
    });

    test('test for click to send msg', () => {
        const initialState = {
            messages: [
                {
                    sender: 'kamal',
                    msg: 'hi',
                    type: 'normal'
                }
            ]
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <Chat />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();
        
        fireEvent.change(
            getByPlaceholderText(container, 'type message ...'),
            {target: {value: 'kbahrar'}}
        )
        expect(screen.getByPlaceholderText('type message ...').value).toBe('kbahrar')

        fireEvent.click(
            getByText(container, 'SEND'),
        )
        expect(screen.getByPlaceholderText('type message ...').value).not.toBe('kbahrar')
    });
})