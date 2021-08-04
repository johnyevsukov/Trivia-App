import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import styled from 'styled-components'

const StyledGame = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(to right top,
    #396dbb, #0098df, 
    #00becb, #00db84, 
    #a8eb12);

form {
    display: flex;
    flex-direction: column;

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
`

const Game = (props) => {
    const [score, setScore] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const { questions } = props

    const incrementIndex = () => {
        setQuestionIndex(questionIndex + 1)
    }

    const calculateScore = () => {
        const numberCorrect = score.filter(item => item === 'correct').length
        const numberOfQuestions = questions.length
        return (
            <div>
                <h2>You answered {numberCorrect} questions correctly out of {numberOfQuestions}.</h2>
                <button>Home</button>
            </div>
        )
    }

    console.log(questions)

    return (
        <StyledGame>
            {questionIndex < questions.length ? <h2>Question {questionIndex + 1}/{questions.length}</h2> : <h2>Results:</h2>}
            {questionIndex < questions.length ? <QuestionCard question={questions[questionIndex]} incrementIndex={incrementIndex} setScore={setScore} score={score}/> : <p>{calculateScore()}</p>}
        </StyledGame>
    )
}

export default Game;