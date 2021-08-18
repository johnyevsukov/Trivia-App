import React from 'react'
import styled from 'styled-components'

const StyledResults = styled.div`
height: 100vh;
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
    font-size: 2.8rem;
    margin-bottom: 4rem;
    width: 20ch;
    text-align: center;
}

button {
    cursor: pointer;
    font-family: 'Press Start 2P';
    width: 250px;
    height: 40px;
    transition: 0.2s ease-in-out;
    border-radius: 5px;
}

/* desktop only */
@media (min-width: 820px) {
    button {
        &:hover {
            background: lightgreen;
            transform: scale(1.1);
            color: white;
            box-shadow:
            0 0 10px 5px #fff,  /* inner white */
            0 0 16.5px 10px lightgreen,
            0 0 23px 15px lightgreen;
        }
    }
}

/* mobile */
@media (max-width: 600px) {
    h1 {
        font-size: 1.5rem;
        margin-bottom: 1.2rem;
        width: 10ch;
    }

    button {
        background-color: white;
    }
}
`

const Results = (props) => {
    const { score, totalQuestions } = props
    const numberCorrect = score.filter(item => item === 'correct').length

    const refresh = () => {
        window.location.reload()
    }

    return (
        <StyledResults>
            <h1>You answered {numberCorrect} question(s) correctly out of {totalQuestions}.</h1>
            <button onClick={refresh}>Home</button>
        </StyledResults>
    )
}

export default Results
