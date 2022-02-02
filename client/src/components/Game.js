import React from 'react'
import GridBoard from './GAME/GridBoard'
import NextBlock from './GAME/NextBlock'
import ScoreBoard from './GAME/ScoreBoard'
import Controls from './GAME/Controls'
import MessagePopup from './GAME/MessagePopup'

export default function Game() {
    React.useEffect(() => {
        console.log('hi')
        
        return () => {
            console.log('bey')
        };
    }, []);
    
    return (
        <>
            <GridBoard />
            <NextBlock />
            <ScoreBoard />
            <Controls />
            <MessagePopup />
        </>
    )
}