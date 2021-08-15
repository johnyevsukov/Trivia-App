import React from 'react'
import styled from 'styled-components'
import StandardHome from './StandardHome'

const StyledDiv = styled.div`
font-family: 'Press Start 2P';
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
background: linear-gradient(to right top,
    #396dbb, #0098df, 
    #00becb, #00db84, 
    #a8eb12);

h1 {
    font-size: 4rem;
    margin: 0;
    padding: 1rem;
    letter-spacing: 7px;
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

h2 {
    font-size: 2rem;
    letter-spacing: 7px;
    margin: 0;
}

.buttons {
    display: flex;
    flex-direction: column;

    button {
        width: 25%;
        height: 3vh;
        margin: auto;
        margin-top: 2%;
        border-radius: 10px;
        height: 45px;
        font-family: 'Press Start 2P';
        font-size: 1.5rem;
        letter-spacing: 4px;
        &:hover {
            background-color: lightgray;
        }
    }
    .standard {
        &:hover {
            background-color: lightgreen;
            border: 1px outset green;
            box-shadow: 0 10px 30px lightgreen;
        }
    }
}
`

const HomeScreen = (props) => {
    const { setModeChoice } = props

    const handleModeChoice = (e) => {
        setModeChoice(e.target.name)
    }

    return (
        <StyledDiv>
            <h1>TRIVIA</h1>
            <h2>Select Game Mode:</h2>
            <div className='buttons'>
                <button name={'standard'} onClick={handleModeChoice} className='standard'>Standard</button>
                <button disabled={true} name={'blitz'} onClick={handleModeChoice}>Blitz</button>
                <button disabled={true} name={'survival'} onClick={handleModeChoice}>Survival</button>
            </div>
        </StyledDiv>
    )
}

// wip
const BlitzScreen = (props) => {
    return (
        <div>
            <h1>Blitz</h1>
            <button onClick={()=>{props.setModeChoice('')}}>back</button>
        </div>
    )
}
// wip
const SurvivalScreen = (props) => {
    return (
        <div>
            <h1>Survival</h1>
            <button onClick={()=>{props.setModeChoice('')}}>back</button>
        </div>
    )
}


const HomeScreens = (props) => {
    
    switch(props.modeChoice) {
        case '':
            return <HomeScreen setModeChoice={props.setModeChoice}/>
        case 'standard':
            return <StandardHome setModeChoice={props.setModeChoice} sort={props.sort} setQuestions={props.setQuestions}/>
        case 'blitz':
            return <BlitzScreen setModeChoice={props.setModeChoice}/>
        case 'survival':
            return <SurvivalScreen setModeChoice={props.setModeChoice}/>
        default:
            return <h1>Error</h1>
    }
}


export default HomeScreens;