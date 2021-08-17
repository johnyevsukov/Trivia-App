import React, { useState } from 'react'
import Home from './Home'
import Settings from './Settings'

const Setup = (props) => {
    const [isHome, setIsHome] = useState(true)
    const { initializeGame } = props

    return (
        <div>
            {
                isHome ? <Home setIsHome={setIsHome}/> : <Settings initializeGame={initializeGame}/>
            }
        </div>
    )
}

export default Setup
