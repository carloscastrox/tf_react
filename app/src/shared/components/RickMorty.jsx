import React, { useState, useEffect } from 'react';

export const Api = () => {
    const [characters, setCharacters] = useState([]);
    const [name, setName] = useState('');
    

    const getCharacters = async () => {
        await fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getCharacters();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filtered = characters.filter((char) =>
            char.name.toLowerCase().includes(name.toLowerCase())
        );

        setCharacters(filtered);
    };

    return (
        <div className="app">
            <div className="add-post-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar personaje"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </div>

            <div className="characters">
                {characters.map((char) => (
                    <div key={char.id} className="card">
                        <img src={char.image} alt={char.name} width="150" />
                        <h3>{char.name}</h3>
                        <p>Status: {char.status}</p>
                        <p>Species: {char.species}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};