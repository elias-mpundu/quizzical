import { useState, useEffect } from 'react'
import Card from './components/card.jsx'
import './App.css'

function App() {
  
  
  const [quiz, setQuiz] = useState(false)

  function startGame() {
    setQuiz(true)
  }

  return (
    <div className="main-body">
      {
        quiz ? 
        <Card /> :
        <div>
          <h1>Quizzical</h1>
          <h4></h4>  
          <button className="game-start" onClick={startGame}>Start Game</button>
        </div>
        
      }
    </div>
  )
}

export default App
