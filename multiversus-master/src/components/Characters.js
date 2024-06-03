import CharacterList from "./CharacterList";
import useFetch from "../hooks/useFetch";
import Multiversusdle from "../Multiversusdle";
import "../styles/CharacterList.css";

const Characters = () => {
  const {
    data: characters,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/characters");
  console.log("Characters:", characters);

  return (
    <div className="home">
      {error && <div> {error} </div>}
      {isLoading && <div className="loader"></div>}
      {characters && (
        <>
          <CharacterList characters={characters} title="All Characters" />
          {/* <Multiversusdle characters={characters} /> */}
        </>
      )}
    </div>
  );
};

export default Characters;
