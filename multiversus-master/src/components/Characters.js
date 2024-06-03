import CharacterList from "./CharacterList";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const {
    data: characters,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/characters");

  return (
    <div className="home">
      {error && <div> {error} </div>} {/* Conditional Template: */}
      {isLoading && <div className="loader"></div>}
      {characters && (
        <CharacterList characters={characters} title="All Characters" />
      )}
    </div>
  );
};

export default Home;
