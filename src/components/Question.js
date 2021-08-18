import React, { useState } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound';
import beepSfx from '../sounds/beep.mp3';
import popSfx from '../sounds/pop.mp3';

const StyledQuestion = styled.div`
height: 100vh;

.wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: 
    linear-gradient(to right top, 
    #1d83ff, #00a0ff, #00b8ff,
    #00cfff, #00e3ff, #00edfc,
    #00f6f7, #09ffef, #00ffdd,
    #00ffc7, #00ffac, #29ff8e);
}

.choice-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
}

.submit-button {
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: 'Press Start 2P';
    width: 250px;
    height: 40px;
    transition: 0.2s ease-in-out;
    border-radius: 5px;
}

.correct {
    font-size: 2rem;
    font-family: 'Press Start 2P';
    color: #42ff42;
    text-shadow: 1px 1px 25px #42ff42;
    -webkit-text-stroke: 1.2px black;
}

.incorrect {
    text-align: center;
    font-size: 1.4rem;
    line-height: 1.3;
    font-family: 'Press Start 2P';
    color: red;
    text-shadow: 2px 2px 7px red;
    -webkit-text-stroke: 1.2px white;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

label {
    display: flex;
    cursor: pointer;
    font-size: 1.4rem;
    margin-bottom: .3rem;
}

h1 {
    font-family: 'Press Start 2P';
    font-size: 2.8rem;
    margin-bottom: 2rem;
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
    font-size: 2.4rem;
    margin-bottom: 2rem;
    width: 45ch;
    text-align: center;
}

/* desktop only */
@media (min-width: 820px) {
    .submit-button {
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

    .choice-option {
        &:hover {
            transform: scale(1.3);
            color: lightgreen;
            text-shadow: 4px 4px 7px green;
            -webkit-text-stroke: .9px black;
        }
    }
}

/* mobile */
@media (max-width: 600px) {
    h1 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 1.5rem;
        width: 25ch;
        margin-bottom: 1rem;
    }

    label {
        font-size: 1.2rem;
        margin-bottom: .1rem;
    }
}
`

const Question = (props) => {
    const [formValue, setFormValue] = useState()
    const [isAnswered, setIsAnswered] = useState(false)
    const [beep] = useSound(beepSfx);
    const [pop] = useSound(popSfx);
    const { 
        question,
        questions,
        questionNumber,
        next,
        setScore,
        score 
    } = props

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        if(!isAnswered) {
            e.preventDefault()
            pop()
            setScore([
                ...score,
                formValue === question.correct ? 
                'correct' : 
                'incorrect'
            ])
            setIsAnswered(true)
        }
        else {
            e.preventDefault()
            next()
            setIsAnswered(false)
        }
    }

    /* seperated out into seperate component
    to satisfy react's unique key requirement */
    const AnswerChoice = (props) => {
        const { choice } = props
        return (
            <label className='choice-option' onMouseOver={beep}>
                <input
                type='radio'
                name='question'
                value={choice}
                checked={formValue === choice}
                onChange={handleChange}
                disabled={isAnswered}
                />
                {/* dangerouslySetInnerHTML due to the API's use of html entities */}
                <span dangerouslySetInnerHTML={{__html:choice}}></span>
            </label>
        )
    }

    return (
        <StyledQuestion>
            <div className='wrapper'>
                <h1>Question {questionNumber + 1}/{questions}</h1>
                {/* dangerouslySetInnerHTML due to the API's use of html entities */}
                <h2 dangerouslySetInnerHTML={{__html:question.question}}></h2>
                <form onSubmit={handleSubmit}>
                    <div className='choice-container'>
                        {question.choices.map((choice, i) => {
                            return (
                                <AnswerChoice key={i} choice={choice}/>
                            )
                        })}
                    </div>
                    <button className='submit-button'>{isAnswered ? 'Next Question' : 'Submit Answer'}</button>
                </form>
                {
                    isAnswered && 
                    (formValue === question.correct ? 
                    <span className='correct'>Correct!</span> : 
                    <span className='incorrect'>Wrong! <br/> correct answer: <br/> {question.correct}</span>)
                }
            </div>
        </StyledQuestion>
    )
}

export default Question
