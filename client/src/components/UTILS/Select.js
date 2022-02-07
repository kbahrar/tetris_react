import React from "react";
import { useSelector } from 'react-redux'

export default function Select(props) {
	const auth = useSelector(state => state.auth)
    const roomPlayers = useSelector(state => state.room?.players)

    const players = roomPlayers?.map(item => {
        if (item !== auth?.name)
            return <option value={item}>{item}</option>
    })

	return (
        <select className="select-dev" value={auth?.opponent} name="cars" id="cars">
           {players}
        </select>
	)
}