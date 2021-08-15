import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import styled from 'styled-components'

const StyledGame = styled.div`
font-family: 'Press Start 2P';
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(to right top,
    #396dbb, #0098df, 
    #00becb, #00db84, 
    #a8eb12);

h2 {
    font-family: 'Press Start 2P';
    letter-spacing: 1.5px;
    margin-top: 0;
    font-size: 1.5rem;
    width: 40ch;
}

.question {
    letter-spacing: 5px;
    font-size: 3rem;
    font-family: 'Press Start 2P';
    background: linear-gradient(to right, #FFF 20%, #03fc4a 40%, #03fc4a 60%, #FFF 80%);
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

form {
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    font-family: 'Press Start 2P';
    letter-spacing: 2px;

    button {
        width: 25%;
        margin: auto;
        margin-top: 1%;
        margin-bottom: 1%;
    }
}

button {
    width: 50px;
}

.home {
    font-family: 'Press Start 2P';
    width: 6rem;
    font-size: 1.2rem;
}
`

const Game = (props) => {
    const [score, setScore] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const { questions } = props

    const refresh = () => {
        window.location.reload()
    }

    const incrementIndex = () => {
        setQuestionIndex(questionIndex + 1)
    }

    const calculateScore = () => {
        const numberCorrect = score.filter(item => item === 'correct').length
        const numberOfQuestions = questions.length
        return (
            <div>
                <h2>You answered {numberCorrect} questions correctly out of {numberOfQuestions}.</h2>
                <button className='home' onClick={refresh}>Home</button>
            </div>
        )
    }

    console.log(questions)

    return (
        <StyledGame>
            {questionIndex < questions.length ? <h2 className='question'>Question {questionIndex + 1}/{questions.length}</h2> : <h2>Results:</h2>}
            {questionIndex < questions.length ? <QuestionCard question={questions[questionIndex]} incrementIndex={incrementIndex} setScore={setScore} score={score}/> : calculateScore()}
        </StyledGame>
    )
}

export default Game;