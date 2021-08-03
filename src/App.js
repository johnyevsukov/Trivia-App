import React, { useState } from 'react'
import HomeScreens from './components/HomeScreens'
import Game from './components/Game'
import './App.css';

function App() {
  const [modeChoice, setModeChoice] = useState('')
  const [ questions, setQuestions ] = useState('')


  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  const sortQuestions = (questionsArray) => {
    const sortedQuestions = questionsArray.map((question, indx) => {
      const choices = question.incorrect_answers
      choices.push(question.correct_answer)
      shuffleArray(choices)
      return {
        id: indx,
        question: question.question, 
        correct: question.correct_answer, 
        choices: choices}
    })
    setQuestions(sortedQuestions)
    console.log(questions)
  }


  return (
    <div className="App">
      {questions ? <Game questions={questions}/> : <HomeScreens modeChoice={modeChoice} setModeChoice={setModeChoice} sort={sortQuestions} setQuestions={setQuestions}/>}
    </div>
  );
}

export default App;
