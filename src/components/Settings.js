import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import useSound from 'use-sound';
import beepSfx from '../sounds/beep.mp3';
import axios from 'axios';
import schema from "../validation/formSchema";
import * as yup from "yup";

const StyledSettings = styled.div`
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

.category-container {
    display: flex;
    flex-direction: column;
}

.category-choice {
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
        transform: scale(1.1);
        color: lightgreen;
        text-shadow: 4px 4px 7px green;
        -webkit-text-stroke: .3px white;
    }
}

.difficulty {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
}

.questions {
    font-size: 1.8rem;
    margin-top: 1.4rem;
    display: flex;
    flex-direction: row;
    text-align: center;
}

select {
    font-family: 'Press Start 2P';
    margin: auto;
    padding: .2rem;
    margin-top: .2rem;
    cursor: pointer;
}

h1 {
    margin-bottom: 2rem;
    text-align: center;
    font-family: 'Press Start 2P';
    font-size: 3.5rem;
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

h3 {
    font-family: 'Press Start 2P';
    margin-bottom: .5rem;
    margin-top: 1rem;
    font-size: 1.8rem;
}

form {
    font-family: 'Press Start 2P';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    font-family: 'Press Start 2P';
    border-radius: 5px;
    margin-top: .7rem;
    width: 100px;
    height: 25px;
    transition: 0.2s ease-in-out;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
}

/* mobile */
@media (max-width: 600px) {
    h1 {
        font-size: 2rem;
    }

    .difficulty {
        font-size: 1.4rem;
        flex-direction: column;
    }
    
    .questions {
        font-size: 1.4rem;
        margin-top: 1rem;
        flex-direction: column;
    }

    h3 {
        margin-bottom: .5rem;
        margin-top: .2rem;
        font-size: 1.4rem;
    }

    .category-choice {
        font-size: 1.2rem;
    }
}
`

const initialFromValues = {
    difficulty: '',
    category: '',
    questions: '',
}

const initialFormErrors = {
    difficulty: "",
    category: "",
    questions: "",
  };

const initialDisabled = true;

const Settings = (props) => {
    const [formValues, setFormValues] = useState(initialFromValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    const [beep] = useSound(beepSfx);
    const { initializeGame } = props

    /* submit form values. plug-in each user selection
    into the trivia API endpoint in order to retrieve
    the custom requested game type. */
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://opentdb.com/api.php?amount=${formValues.questions}&category=${formValues.category}${handleDifficulty()}`)
        .then(res => {
            initializeGame(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    /* the trivia API adds nothing to the
    last portion of the endpoint if the difficulty
    selection is mixed  */
    const handleDifficulty = () => {
        if(formValues.difficulty === 'mixed') {
            return('')
        }
        else {
            return(`&difficulty=${formValues.difficulty}`)
        }
    }

    /* check form values against yup form schema.
    if errors, set form errors. */
    const handleChange = (e) => {
        const { name, value } = e.target
        
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => {
              setFormErrors({
              ...formErrors,
              [name]: "",
              });
          })
          .catch((err) => {
              setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
              });
          });
            setFormValues({
                ...formValues,
                [name]: value
            })
    }

    /* check form values against yup form schema.
    if valid, enable start button. if invalid,
    keep start button disabled. */
    useEffect(() => {
        schema.isValid(formValues)
        .then((valid) => {
            setDisabled(!valid);
        });
        }, [formValues]);

    /* form for selecting game type. input
    number values match corresponding game 
    category (as defined by API. i.e 23 == history) */
    return (
        <StyledSettings>
            <h1>GAME <br/> SETTINGS</h1>
            <form onSubmit={handleSubmit}>
                <label className='difficulty'>
                    Difficulty:&nbsp;
                    <select name='difficulty' onChange={handleChange} value={formValues.difficulty}>
                        <option>-select-</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                        <option value='mixed'>Mixed</option>
                    </select>
                </label>
                <h3>Category:</h3>
                <div className='category-container'>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='23'
                        checked={formValues.category === '23'}
                        onChange={handleChange}
                        />
                        History
                    </label>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='22'
                        checked={formValues.category === '22'}
                        onChange={handleChange}
                        />
                        Geography
                    </label>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='21'
                        checked={formValues.category === '21'}
                        onChange={handleChange}
                        />
                        Sports
                    </label>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='11'
                        checked={formValues.category === '11'}
                        onChange={handleChange}
                        />
                        Film
                    </label>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='12'
                        checked={formValues.category === '12'}
                        onChange={handleChange}
                        />
                        Music
                    </label>
                    <label className='category-choice' onMouseOver={beep}>
                        <input
                        type='radio'
                        name='category'
                        value='9'
                        checked={formValues.category === '9'}
                        onChange={handleChange}
                        />
                        Mixed
                    </label>
                </div>
                <label className='questions'>
                    Questions:&nbsp;
                    <select name='questions' onChange={handleChange} value={formValues.questions}>
                        <option>-select-</option>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                    </select>
                </label>
                <button disabled={disabled}>Start</button>
            </form>
            <div>
                <div>{formErrors.difficulty}</div>
                <div>{formErrors.category}</div>
                <div>{formErrors.questions}</div>
            </div>
        </StyledSettings>
    )
}

export default Settings
