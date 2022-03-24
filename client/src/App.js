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
import Header from './components/UTILS/Header';

function App() {
	const auth = useSelector((state) => state.auth)
	const room = useSelector((state) => state.room)
	const [classes, setClasses] = React.useState('App App-login')
	const navigate = useNavigate()

	React.useEffect(() => {
		if (!auth) {
			setClasses("App App-login");
			navigate("/");
		}
		else if (!room) {
			setClasses("App App-room");
			navigate("/rooms")
		}
		else {
			setClasses("App App-Game");
			navigate(`${room.name}[${auth.name}]`)
		}
	}, [auth, room, navigate])

	return (
		<div className={classes}>
			<Sockets>
				<Header />
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
