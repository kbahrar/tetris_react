import './App.css';
import React, { useEffect } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers';
import socketClient from 'socket.io-client'

import GridBoard from './components/GridBoard';
import NextBlock from './components/NextBlock';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';
import MessagePopup from './components/MessagePopup';

const store = createStore(reducers)

function App() {
	const ENDPOINT = "http://127.0.0.1:5000"

	useEffect(() => {
		const socket = socketClient(ENDPOINT)
		socket.emit("connection", (socket) => {

		})
	}, []);

	return (
		<Provider store={store}>
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Tetris</h1>
				</header>
				<GridBoard />
				<NextBlock />
				<ScoreBoard />
				<Controls />
				<MessagePopup />
			</div>
		</Provider>
	);
}

export default App;
