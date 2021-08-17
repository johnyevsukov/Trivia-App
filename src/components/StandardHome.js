import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import beepSfx from '../sounds/beep.mp3';
import beepSfxTwo from '../sounds/select.mp3';
import styled from 'styled-components'
import axios from 'axios'
import schema from "../validation/formSchema";
import * as yup from "yup";

const StyledHome = styled.div`
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

h1 {
    font-size: 4rem;
    margin: 0;
    padding: 1rem;
    letter-spacing: 7px;
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

select {
    font-family: 'Press Start 2P';
    font-size: 1rem;
    border-radius: 10px;
}

form {
    font-size: 2rem;
    display: flex;
    flex-direction: column;

    button {
        width: 40%;
        margin: auto;
        margin-top: 1%;
        margin-bottom: 1%;
    }
}

label {
    display: flex;
    flex-direction: row;
    text-align: left;
    &:hover {
        color: lightgreen;
    }
}

button {
    font-family: 'Press Start 2P';
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

const StandardHome = (props) => {
    const [play] = useSound(beepSfx)
    const [playTwo] = useSound(beepSfxTwo)
    const [formValues, setFormValues] = useState(initialFromValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const retrieveGameData = () => {
        axios.get(`https://opentdb.com/api.php?amount=${formValues.questions}&category=${formValues.category}${handleDifficulty()}`)
        .then(res => {
            console.log(res.data.results)
            // props.setQuestions(res.data.results)
            props.sort(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleDifficulty = () => {
        if(formValues.difficulty === 'mixed') {
            return('')
        }
        else {
            return(`&difficulty=${formValues.difficulty}`)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        playTwo()
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
    
    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
        }, [formValues]);

    const handleSubmit = (e) => {
        e.preventDefault()
        retrieveGameData()
    }

    return (
        <StyledHome>
            <h1>Standard</h1>
            <form onSubmit={handleSubmit}>
                <label onMouseOver={play}>
                    Difficulty:&nbsp;
                    <select name='difficulty' onChange={handleChange} value={formValues.difficulty}>
                        <option>-select-</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                        <option value='mixed'>Mixed</option>
                    </select>
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='23'
                    checked={formValues.category === '23'}
                    onChange={handleChange}
                    />
                    History
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='22'
                    checked={formValues.category === '22'}
                    onChange={handleChange}
                    />
                    Geography
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='21'
                    checked={formValues.category === '21'}
                    onChange={handleChange}
                    />
                    Sports
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='11'
                    checked={formValues.category === '11'}
                    onChange={handleChange}
                    />
                    Film
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='12'
                    checked={formValues.category === '12'}
                    onChange={handleChange}
                    />
                    Music
                </label>
                <label onMouseOver={play}>
                    <input
                    type='radio'
                    name='category'
                    value='9'
                    checked={formValues.category === '9'}
                    onChange={handleChange}
                    />
                    Mixed
                </label>
                <label onMouseOver={play}>
                    Number of Qs:&nbsp;
                    <select name='questions' onChange={handleChange} value={formValues.questions}>
                        <option>-select-</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='25'>25</option>
                        <option value='30'>30</option>
                    </select>
                </label>
                <button disabled={disabled}>Start</button>
            </form>
            <button onClick={()=>{props.setModeChoice('')}}>back</button>
            <div>
                <div>{formErrors.difficulty}</div>
                <div>{formErrors.category}</div>
                <div>{formErrors.questions}</div>
            </div>
        </StyledHome>
    )
}

export default StandardHome;