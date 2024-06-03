import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import Quiz from "./components/Quiz";

const Multiversusdle = () => {
  const {
    data: characters,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/characters");

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
      <main>{characters && <Quiz characters={characters} />}</main>
      <footer>
        <p>&copy; 2024 Multiversusdle by J7</p>
      </footer>
    </div>
  );
};

export default Multiversusdle;
