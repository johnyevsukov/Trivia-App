import React, { useState } from 'react'
import Game from './components/Game'
import Setup from './components/Setup'
import './App.css';

function App() {
  const [questions, setQuestions] = useState('')

  /* shuffle function for randomizing answer
  choices from the API --otherwise the correct
  answer will always be the last choice-- */
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  /* reorganize the data set from the API. Creates a
  new list of question objects with an id, answer choice
  set, correct answer, and the question itself.
  Then sets questions, which begins the game */
  const initializeGame = (questions) => {
    const reorganizedQuestions = questions.map((question, i) => {
      const choices = question.incorrect_answers
      choices.push(question.correct_answer)
      shuffleArray(choices)
      return {
        id: i,
        question: question.question, 
        correct: question.correct_answer, 
        choices: choices
        }
      })
    setQuestions(reorganizedQuestions)
  }

  /* have questions been set? If yes, start the game.
  If no, stay on setup (home screen and settings) */
  return (
    <div className='app'>
      {
        questions ? <Game questions={questions}/> : <Setup initializeGame={initializeGame}/>
      }
    </div>
  );
}

export default App;
