import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'

function GuessingGame() {
  const [luckyNumber, setLuckyNumber] = useState(null)
  const [currentGuess, setCurrentGuess] = useState()
  const [totalGuesses, setTotalGuesses] = useState(0)
  const [newGuess, setNewGuess] = useState()
  const [hint, setHint] = useState({
    highGuess: '',
    lowGuess: '',
    correctGuess: '',
  })

  useEffect(() => {
    if (luckyNumber === null) {
      setLuckyNumber(
        JSON.parse(
          localStorage.getItem('luckyNumber') ||
            Math.floor(Math.random() * 100 + 1)
        )
      )
      setTotalGuesses(JSON.parse(localStorage.getItem('totalGuesses') || 0))
    } else {
      localStorage.setItem('luckyNumber', JSON.stringify(luckyNumber))
      localStorage.setItem('totalGuesses', totalGuesses)
    }
  }, [luckyNumber, totalGuesses])

  function resetGame() {
    setLuckyNumber(Math.floor(Math.random() * 100 + 1))
    setTotalGuesses(0)
    setCurrentGuess('')
    setNewGuess('')
    setHint({
      highGuess: '',
      lowGuess: '',
      correctGuess: '',
    })
  }

  function handleGuess(event) {
    setNewGuess(currentGuess)
    event.preventDefault()
    setTotalGuesses(totalGuesses + 1)
    setHint({
      highGuess: 'Your guess is too high!',
      lowGuess: 'Your guess is too low!',
      correctGuess: 'Congrats you guessed it!',
    })
  }

  function handleChange(event) {
    setCurrentGuess(event.target.value)
  }

  return (
    <>
      <p>
        I am thinking of a number between 1 and 100. Guess the Lucky Number!
      </p>
      <p>{`You have made ${totalGuesses} guesses`}</p>
      <Form onSubmit={handleGuess}>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ width: '30vw', margin: 'auto' }}
            type="text"
            value={currentGuess}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Guess</Button>
        <br />
        <br />
        <Button onClick={resetGame}>Reset</Button>
      </Form>
      <div>
        {totalGuesses == 0 ? <p>Start Guessing</p> : ''}
        {newGuess < luckyNumber ? <p>{hint.lowGuess}</p> : ''}
        {newGuess > luckyNumber ? <p>{hint.highGuess}</p> : ''}
        {newGuess == luckyNumber ? <p>{hint.correctGuess}</p> : ''}
      </div>
    </>
  )
}

export default GuessingGame
