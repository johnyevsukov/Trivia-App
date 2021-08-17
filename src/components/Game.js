import React, { useState } from 'react'
import Question from './Question'
import Results from './Results'

const Game = (props) => {
    const [score, setScore] = useState([])
    const [questionNumber, setQuestionNumber] = useState(1)
    const { questions } = props
    const totalQuestions = questions.length

    const nextQuestion = () => {
        setQuestionNumber(questionNumber + 1)
    }

    return (
        <div>
            <div className='wrapper'>
                {
                    questionNumber < totalQuestions ? 
                    <Question 
                    question={questions[questionNumber]}
                    questions={totalQuestions}
                    questionNumber={questionNumber}
                    next={nextQuestion} 
                    setScore={setScore} 
                    score={score}/>
                    : <Results score={score} totalQuestions={totalQuestions}/>
                }
            </div>
        </div>
    )
}

export default Game
