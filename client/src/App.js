import './App.css';
import React from 'react';
import { useSelector } from 'react-redux'
import {
	Routes,
	Route,
	useNavigate
} from "react-router-dom";

import Sockets from './services/Sockets';

import Game from './components/Game';
import Login from './components/Login';
import Rooms from './components/Rooms';

function App() {
	var auth = useSelector((state) => state.auth)
	const navigate = useNavigate()

	React.useEffect(() => {
		if (!auth)
			navigate("/");
		else
			navigate("/rooms")
	}, [auth])

	return (
		<div className="App">
			<Sockets>
				<header className="App-header">
					<h1 className="App-title">Tetris</h1>
				</header>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="rooms" element={<Rooms />} />
					<Route path="game" element={<Game />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</Sockets>
		</div>

	);
}

export default App;
