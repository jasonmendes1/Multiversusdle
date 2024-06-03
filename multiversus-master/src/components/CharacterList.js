import { Link } from "react-router-dom";
import "../styles/CharacterList.css";

const CharacterList = ({ characters, name }) => {
  return (
    <div className="character-grid-container">
      <h2 className="list-title">{name}</h2>
      <div className="character-list">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <div className="character-info">
              <h3 className="character-name">{character.name}</h3>
              <p className="character-universe">
                Universe: {character.universe}
              </p>
            </div>
            <Link to={`/characters/${character.id}`} className="character-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
