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
	const auth = useSelector((state) => state.auth)
	const room = useSelector((state) => state.room)
	const navigate = useNavigate()

	React.useEffect(() => {
		if (room)
		console.log(room.name)
		if (!auth)
			navigate("/");
		else if (room)
			navigate(`${room.name}[${auth.name}]`)
		else
			navigate("/rooms")
	}, [auth, room])

	return (
		<div className="App">
			<Sockets>
				<header className="App-header">
					<h1 className="App-title">Tetris</h1>
				</header>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="rooms" element={<Rooms />} />
					<Route path=":room[:username]" element={<Game />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</Sockets>
		</div>

	);
}

export default App;
