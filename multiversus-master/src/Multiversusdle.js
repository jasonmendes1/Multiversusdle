import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import CharacterList from "./components/CharacterList";

const Multiversusdle = () => {
  const {
    data: characters,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/characters");
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [guess, setGuess] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);

  useEffect(() => {
    if (characters && characters.characters) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setRandomCharacter(characters[randomIndex]);
    }
  }, [characters]);

  const handleGuess = (event) => {
    event.preventDefault();
    if (
      randomCharacter &&
      guess.toLowerCase() === randomCharacter.name.toLowerCase()
    ) {
      setCorrectGuess(true);
    } else {
      setCorrectGuess(false);
    }
    setShowResult(true);
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Multiversusdle</h1>
      </header>
      <main>
        <CharacterList
          characters={
            characters && characters.characters ? characters.characters : []
          }
        />
        {randomCharacter && (
          <div className="guess-character">
            <p>Guess the character:</p>
            <img src={randomCharacter.image} alt={randomCharacter.name} />
          </div>
        )}
        {showResult && (
          <div className="guess-result">
            {correctGuess ? (
              <p>Congratulations! You guessed correctly!</p>
            ) : (
              <p>Sorry, your guess was incorrect. Try again!</p>
            )}
          </div>
        )}
        <form onSubmit={handleGuess}>
          <label>
            Your guess:
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
        <p>&copy; 2024 Multiversusdle by J7</p>
      </footer>
    </div>
  );
};

export default Multiversusdle;
