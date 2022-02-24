import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import App from './App';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'
import { gridDefault } from './utils';

const middlewares = []
const mockStore = configureStore(middlewares)

test('test for login router', () => {
	const initialState = {}
	const store = mockStore(initialState)
	render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	);
	const linkElement = screen.getByText(/User Name :/i);
	expect(linkElement).toBeInTheDocument();
});

test('test for rooms router', () => {
	const initialState = {
		users: [],
		rooms: [],
		auth: {
			name: 'kamal'
		}
	}
	const store = mockStore(initialState)
	render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	);
	const linkElement = screen.getByText(/users online/i);
	expect(linkElement).toBeInTheDocument();
});

test('test for rooms router', () => {
	const initialState = {
		game: {
			grid: gridDefault(),
			shape: 0,
			rotation: 0,
			yShadow: -2,
			nextShape: 1,
			x: 0,
			y: -2,
			gameOver: false,
			isWin: false,
		},
		room: {
			name: 'kamal',
			host: 'kbahrar',
			isLocked: false
		},
		users: [],
		rooms: [],
		auth: {
			name: 'kamal'
		}
	}
	const store = mockStore(initialState)
	render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	);
	const linkElement = screen.getByText(/score/i);
	expect(linkElement).toBeInTheDocument();
});
