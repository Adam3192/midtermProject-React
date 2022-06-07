import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';

function GuessingGame() {
  const [luckyNumber, setLuckyNumber] = useState(Math.floor((Math.random() * 100) + 1));
  const [currentGuess, setCurrentGuess] = useState();
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [hint, setHint] = useState({
    highGuess: "Your guess is too high!",
    lowGuess: "Your guess is too low!",
    correctGuess: "You guessed the Lucky Number!"
  });
  
  function resetGame() {
    setLuckyNumber(Math.floor((Math.random() * 100) + 1))
    setTotalGuesses(0)
    
  }

  function handleGuess(event) {
    setTotalGuesses(totalGuesses + 1)
    setCurrentGuess(event.target.value);
    event.preventDefault()
  }

  function handleChange(event) {
    setCurrentGuess(event.target.value);
  }

  return (
  <>
    <p>I am thinking of a number between 1 and 100. Guess the Lucky Number!</p>
    <p>{`You have made ${totalGuesses} guesses`}</p>
      <Form onSubmit={handleGuess}>
      <Form.Group className="mb-3" >
        <Form.Control type="text" value={currentGuess} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Guess</Button> 
        <br />
        <br />
      <Button onClick={resetGame}>Reset</Button>
      </Form>
      <div>
        { currentGuess < luckyNumber ? <p>{hint.lowGuess}</p> : ''}
        { currentGuess > luckyNumber ? <p>{hint.highGuess}</p> : ''}
        { currentGuess == luckyNumber ? <p>{hint.correctGuess}</p> : ''}
      </div>
  </>
  );
}

export default GuessingGame;

