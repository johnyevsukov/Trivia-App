import React, { useState } from 'react'

const QuestionCard = (props) => {
    const [formValue, setFormValue] = useState()
    const [answered, setAnswered] = useState(false)
    // const [currentAnswer, setCurrentAnswer] = useState()
    const { question, incrementIndex, setScore, score } = props

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        if(!answered) {
            e.preventDefault()
            setScore([
                ...score,
                formValue === question.correct ? 'correct' : 'incorrect'
            ])
            setAnswered(true)
        }
        else {
            e.preventDefault()
            incrementIndex()
            setAnswered(false)
        }
    }

    return (
        <div>
            <h2 dangerouslySetInnerHTML={{__html:question.question}}></h2> {/* The quiz API spits out html entities in certain questions */}
            <form onSubmit={handleSubmit}>
                {question.choices.map(choice => {
                    return (
                        <label>
                            <input
                            type='radio'
                            name='question'
                            value={choice}
                            checked={formValue === choice}
                            onChange={handleChange}
                            disabled={answered}
                            />
                            {choice}
                        </label>
                    )
                })}
                <button>{answered ? 'Next Question' : 'Submit Answer'}</button>
            </form>
            {answered && (formValue === question.correct ? <p>Correct!</p> : <p>Wrong! correct answer: {question.correct}</p>)}
        </div>
    )
}

export default QuestionCard