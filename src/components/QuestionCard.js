import React, { useState } from 'react'
import styled from 'styled-components'

const StyledFrom = styled.div`
display: flex;
flex-direction: column;

button {
    font-family: 'Press Start 2P';
    font-size: 1rem;
}

label {
    margin-top: .5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    &:hover {
        color: lightgreen;
    }
}

.answer {
    margin-top: .5rem;
    font-size: 1.9rem;
}

.correct {
    color: lightgreen;
    text-shadow: 2px 2px 5px lightgreen;
}

.incorrect {
    color: red;
    text-shadow: 4px 4px 7px red;
    -webkit-text-stroke: .3px black;
}
`

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
        <StyledFrom>
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
            {answered && (formValue === question.correct ? <p className='answer correct'>Correct!</p> : <p className='answer incorrect'>Wrong! correct answer: {question.correct}</p>)}
        </StyledFrom>
    )
}

export default QuestionCard