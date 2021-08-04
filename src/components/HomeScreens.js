import React from 'react'
import styled from 'styled-components'
import StandardHome from './StandardHome'

const StyledDiv = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
background: linear-gradient(to right top,
    #396dbb, #0098df, 
    #00becb, #00db84, 
    #a8eb12);

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
        &:hover {
            background-color: lightgray;
            border: 1px outset green;
        }
    }
    .standard {
        &:hover {
            background-color: lightgreen;
            border: 1px outset green;
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
            <h2>Slect Game Mode:</h2>
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