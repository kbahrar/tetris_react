import './App.css';
import React from 'react';
import { useSelector } from 'react-redux'

import Sockets from './services/Sockets';

import Game from './components/Game';
import Login from './components/Login';

function App() {
	var auth = useSelector((state) => state.auth)

	return (
		<div className="App">
			<Sockets />
			<header className="App-header">
				<h1 className="App-title">Tetris</h1>
			</header>
			{
				!auth ?
					<Login />
					:
					<Game />
			}
		</div>
		
	);
}

export default App;
