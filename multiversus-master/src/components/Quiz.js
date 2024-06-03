import React, { useState, useEffect } from "react";

import Select from "react-select";

const getDailyCharacter = (characters) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const storedDate = localStorage.getItem("quizDate");
  let character = null;

  if (storedDate === today) {
    character = JSON.parse(localStorage.getItem("quizCharacter"));
  } else {
    character = characters[Math.floor(Math.random() * characters.length)];
    localStorage.setItem("quizDate", today);
    localStorage.setItem("quizCharacter", JSON.stringify(character));
  }

  return character;
};

const Quiz = ({ characters }) => {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [character, setCharacter] = useState(null);
  const [previousAttempts, setpreviousAttempts] = useState([]);
  const [result, setResult] = useState(null);
  const options = characters.map((character) => ({
    value: character.id,
    label: character.name,
    image: character.image,
  }));

  useEffect(() => {
    if (characters) {
      const dailyCharacter = getDailyCharacter(characters);
      setCharacter(dailyCharacter);
    }
  }, [characters]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents submitting frm
    if (guess.label === character.name) {
      setFeedback("✅ Correct!");
      setResult(true);
      setGuess("");
    } else {
      setFeedback("❌ Incorrect. Try again!");
      setResult(false);
      setGuess("");
    }

    const newCharacter = characters.find(
      (character) => character.name === guess.label
    );

    setpreviousAttempts((previousValues) => [newCharacter, ...previousValues]);
  };

  return (
    <div className="quiz">
      {character && (
        <>
          {/* <div className="hint">
            <p>Name: {character.name}</p>
            <p>Class: {character.class}</p>
            <p>Universe: {character.universe}</p>
          </div> */}
          {!result && (
            <form onSubmit={handleSubmit}>
              <Select
                classNames={{
                  menuList: () => "react-select-options",
                }}
                options={options}
                formatOptionLabel={(character) => (
                  <div>
                    <img src={character.image} height={"auto"} width={"10%"} />
                    {character.label}
                  </div>
                )}
                required
                placeholder="Guess the character"
                value={guess}
                onChange={(e) => setGuess(e)}
                disabled
              />
              <button type="submit">Submit</button>
            </form>
          )}
          {feedback && <p>{feedback}</p>}
          {previousAttempts.length > 0 && (
            <div className="previous-answer">
              <p>Previous Attempt:</p>
              {previousAttempts.map((prevCharacter, index) => (
                <div key={index}>
                  <img
                    src={prevCharacter?.image}
                    alt={prevCharacter?.name}
                    height={"auto"}
                    width={"10%"}
                  />
                  Name: {prevCharacter?.name} | Class: {prevCharacter?.class} |
                  Universe: {prevCharacter?.universe}
                  <p>-----------------------------</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
