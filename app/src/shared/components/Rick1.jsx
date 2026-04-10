import React, { useState, useEffect } from 'react';

const CharacterList = () => {
  // State to store the fetched characters
  const [characters, setCharacters] = useState([]);
  // State for handling loading status
  const [loading, setLoading] = useState(true);
  // State for handling potential errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/characte");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The API response for all characters is an object with a 'results' array
        setCharacters(data.results); 
        setError(null);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []); // The empty dependency array ensures this runs only once on mount

  if (loading) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map(character => (
          // Use a unique key for each item, like the character's ID
          <li key={character.id}>
            <img src={character.image} alt={character.name} width="50" height="50" />
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;