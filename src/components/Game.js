import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

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
        <div>
            {questionIndex < questions.length ? <h2>Question {questionIndex + 1}/{questions.length}</h2> : <h2>Results:</h2>}
            {questionIndex < questions.length ? <QuestionCard question={questions[questionIndex]} incrementIndex={incrementIndex} setScore={setScore} score={score}/> : <p>{calculateScore()}</p>}
        </div>
    )
}

export default Game;