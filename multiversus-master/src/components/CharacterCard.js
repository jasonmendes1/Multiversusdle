import React from "react";

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      <p>
        {character.class} - {character.universe}
      </p>
      <h2>test</h2>
    </div>
  );
};

export default CharacterCard;
