import './App.css';
import React, { useEffect } from 'react';
import socketClient from 'socket.io-client'
import { useSelector } from 'react-redux'

import GridBoard from './components/GAME/GridBoard'
import NextBlock from './components/GAME/NextBlock'
import ScoreBoard from './components/GAME/ScoreBoard'
import Controls from './components/GAME/Controls'
import MessagePopup from './components/GAME/MessagePopup'
import Login from './components/Login';

function App() {

	const ENDPOINT = "http://127.0.0.1:5000"
	var auth = useSelector((state) => state.auth)
	useEffect(() => {
		const socket = socketClient(ENDPOINT)

	}, []);


	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Tetris</h1>
			</header>
			{
				!auth ?
					<Login />
					:
					<>
						<GridBoard />
						<NextBlock />
						<ScoreBoard />
						<Controls />
						<MessagePopup />
					</>
			}
		</div>
	);
}

export default App;
