import React from 'react'
import styled from 'styled-components'
import useSound from 'use-sound';
import popSfx from '../sounds/pop.mp3';

const StyledHome = styled.div`
height: 100vh;
.wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    background: 
    linear-gradient(to right top, 
    #1d83ff, #00a0ff, #00b8ff,
    #00cfff, #00e3ff, #00edfc,
    #00f6f7, #09ffef, #00ffdd,
    #00ffc7, #00ffac, #29ff8e);
}

h1 {
    font-family: 'Press Start 2P';
    font-size: 5rem;
    margin-bottom: 4rem;
    background: linear-gradient(to right, #FFF 20%, black 40%, black 60%, #FFF 80%);
    background-size: 200% auto;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s linear infinite;
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
}

button {
    font-family: 'Press Start 2P';
    border-radius: 5px;
    font-size: 1.2rem;
    width: 200px;
    height: 40px;
    transition: 0.2s ease-in-out;
    &:hover {
        background: lightgreen;
        transform: scale(1.1);
        color: white;
        box-shadow:
        0 0 30px 15px #fff,  /* inner white */
        0 0 50px 30px lightgreen,
        0 0 70px 45px lightgreen;
    }
}
`

const Home = (props) => {
    const [pop] = useSound(popSfx)
    const { setIsHome } = props

    const goToSettings = () => {
        pop()
        setIsHome(false)
    }

    return (
        <StyledHome>
            <div className='wrapper'>
                <h1>TRIVIA</h1>
                <button onClick={goToSettings}>START</button>
            </div>
        </StyledHome>
    )
}

export default Home
