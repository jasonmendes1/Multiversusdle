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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (characters) {
      const dailyCharacter = getDailyCharacter(characters);
      setCharacter(dailyCharacter);
      setOptions(
        characters.map((character) => ({
          value: character.id,
          label: character.name,
          class: character.class,
          universe: character.universe,
          image: character.image,
        }))
      );
    }
  }, [characters]);

  const handleSubmit = (guess) => {
    if (!guess) return;

    const guessedCharacter = characters.find(
      (character) => character.id === guess.value
    );

    let feedbackMessage = "";
    let isCorrect = true;

    if (guess.label === character.name) {
      // feedbackMessage += "✅ Name is Correct! ";
      setGuess("");
    } else {
      // feedbackMessage += "❌ Name is Incorrect ";
      isCorrect = false;
      setGuess("");
    }

    if (guess.class == character.class) {
      // feedbackMessage += "✅ Class is Correct! ";
      setGuess("");
    } else {
      // feedbackMessage += "❌ Class is Incorrect ";
      isCorrect = false;
      setGuess("");
    }

    if (guess.universe == character.universe) {
      // feedbackMessage += "✅ Universe is Correct! ";
      setGuess("");
    } else {
      // feedbackMessage += "❌ Universe is Incorrect ";
      isCorrect = false;
      setGuess("");
    }

    setFeedback(feedbackMessage);
    setResult(isCorrect);

    const newCharacter = characters.find(
      (character) => character.name === guess.label
    );

    setpreviousAttempts((previousValues) => [newCharacter, ...previousValues]);

    // Remove the guessed option from the options
    setOptions((currentOptions) =>
      currentOptions.filter((option) => option.value !== guess.value)
    );
  };

  const getFeedbackForAttempt = (attempt) => {
    let nameFeedback = attempt.name === character.name ? "✅" : "❌";
    let classFeedback = attempt.class === character.class ? "✅" : "❌";
    let universeFeedback =
      attempt.universe === character.universe ? "✅" : "❌";
    return { nameFeedback, classFeedback, universeFeedback };
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
                onChange={(guess) => {
                  setGuess(guess);
                  handleSubmit(guess); // Trigger submission on selection
                }}
              />
              {console.log("value: ", guess)}
            </form>
          )}
          {feedback && <p>{feedback}</p>}
          {previousAttempts.length > 0 && (
            <div className="previous-answer">
              <p>Previous Attempt:</p>
              {previousAttempts.map((prevCharacter, index) => {
                const { nameFeedback, classFeedback, universeFeedback } =
                  getFeedbackForAttempt(prevCharacter);
                return (
                  <div key={index}>
                    <img
                      src={prevCharacter?.image}
                      alt={prevCharacter?.name}
                      height={"auto"}
                      width={"10%"}
                    />
                    {nameFeedback} Name: {prevCharacter?.name} | {classFeedback}
                    Class: {prevCharacter?.class} | {universeFeedback} Universe:{" "}
                    {prevCharacter?.universe}
                    <p>-----------------------------</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
