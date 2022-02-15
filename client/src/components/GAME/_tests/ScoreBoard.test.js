import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import ScoreBoard from '../ScoreBoard';
import React from 'react';
import configureStore from 'redux-mock-store'
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

const middlewares = []
const mockStore = configureStore(middlewares)

describe("<ScoreBoard />", () => {

    test('test for initial score board', () => {
        const initialState = {
            game: {
                score: 0
            },
            room: {
                players: []
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/Score: 0/i)
        expect(element).toBeInTheDocument();
    });

    test('test for exist msgs', () => {
        const initialState = {
            game: {
                score: 0
            },
            room: {
                players: [],
                messages: [
                    {
                        type: 'normal',
                        msg: 'hi test',
                        sender: 'kamal'
                    }
                ]
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        let element = screen.getByText(/hi test/i)
        expect(element).toBeInTheDocument();
        element = screen.getByText(/kamal/i)
        expect(element).toBeInTheDocument();
    });

    test('test for no host', () => {
        const initialState = {
            auth: {
                name: 'kamal'
            },
            game: {
                score: 0
            },
            room: {
                host: 'kbahrar',
                players: [],
                messages: [
                    {
                        type: 'normal',
                        msg: 'hi test',
                        sender: 'kamal'
                    }
                ]
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        // let element = screen.getAllByRole('button')
        expect(screen.queryAllByRole('button')).not.toBe();
    });

    test('test for host and game is running', () => {
        const initialState = {
            auth: {
                name: 'kamal'
            },
            game: {
                score: 0,
                isRunning: true
            },
            room: {
                host: 'kamal',
                players: [],
                messages: [
                    {
                        type: 'normal',
                        msg: 'hi test',
                        sender: 'kamal'
                    }
                ]
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        // let element = screen.getAllByRole('button')
        expect(screen.queryAllByRole('button')).not.toBe();
    });

    test('test for type msg', () => {
        const initialState = {
            game: {
                score: 0
            },
            room: {
                players: []
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        fireEvent.change(
            getByPlaceholderText(container, 'type message ...'),
            {target: {value: 'kbahrar'}}
        )
        expect(screen.getByPlaceholderText('type message ...').value).toBe('kbahrar')
    });

    test('test for send msg', () => {
        const socketTest = {
            emit: (event) => {
                return event
            }
        }

        const initialState = {
            socket: socketTest,
            game: {
                score: 0
            },
            room: {
                players: []
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();

        fireEvent.change(
            getByPlaceholderText(container, 'type message ...'),
            {target: {value: 'kbahrar'}}
        )
        expect(screen.getByPlaceholderText('type message ...').value).toBe('kbahrar')

        fireEvent.click(
            getByText(container, 'SEND')
        )

        expect(screen.getByPlaceholderText('type message ...').value).not.toBe('kbahrar')
    });

    test('test for restart', () => {
        const socketTest = {
            emit: (event) => {
                return event
            }
        }

        const initialState = {
            socket: socketTest,
            game: {
                score: 0,
                canRestart: true
            },
            room: {
                players: []
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();


        let element = screen.getByText(/Restart/i)
        expect(element).toBeInTheDocument();

        fireEvent.click(
            getByText(container, 'Restart')
        )
    });

    test('test for start', () => {
        const socketTest = {
            emit: (event) => {
                return event
            }
        }

        const initialState = {
            socket: socketTest,
            game: {
                score: 0,
                canRestart: false,
                isRunning: false
            },
            room: {
                players: []
            }
        }
        const store = mockStore(initialState)
        const { container } = render(
            <Provider store={store}>
                <ScoreBoard />
            </Provider>
        );
    
        expect(container).not.toBeEmptyDOMElement();


        let element = screen.getByText(/Start/i)
        expect(element).toBeInTheDocument();

        fireEvent.click(
            getByText(container, 'Start')
        )

        const initialState2 = {
            socket: socketTest,
            game: {
                score: 0,
                gameOver: true,
                canRestart: false,
                isRunning: false
            },
            room: {
                players: []
            }
        }
        const store2 = mockStore(initialState2)
        var ret = render(
            <Provider store={store2}>
                <ScoreBoard />
            </Provider>
        );

        fireEvent.click(
            getByText(ret.container, 'Start')
        )
    });
})