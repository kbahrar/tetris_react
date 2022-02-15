import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addOpponent, resetDataOp } from '../../actions'

export default function Select(props) {
    const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
    const roomPlayers = useSelector(state => state.room?.players)
    const [player, setPlayer] = React.useState(auth?.opponent)
    const room = useSelector(state => state.room)

    const players = roomPlayers?.map(item => {
        if (item !== auth?.name)
            return <option key={item} value={item}>{item}</option>
        return <></>
    })

    const handleChange = (e) => {
        const input = document.querySelector("#select");
        input.blur()
        if (player !== e.target.value) {
            setPlayer(e.target.value)
            dispatch(resetDataOp())
            dispatch(addOpponent(e.target.value))
        }
    }

    React.useEffect(() => {
        if (!auth?.opponent) {
            if (room && room?.players.length > 1 && !auth?.opponent) {
                room.players.map((item) => {
                    if (item !== auth?.name) {
                        dispatch(addOpponent(item))
                    }
                    return true
                })
            }
        }
    }, [auth, room, dispatch]);

	return (
        <select role='select' className="select-dev" id="select" value={player} onChange={handleChange}>
           {players}
        </select>
	)
}