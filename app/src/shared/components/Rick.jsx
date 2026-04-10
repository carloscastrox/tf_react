import { useEffect, useState } from "react";

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setCharacters(data.results);
    }

    getCharacters();
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>

      {characters.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt={character.name} width="100" />
        </div>
      ))}
    </div>
  );
}