import { useEffect, useState } from "react";
import { getCharacters } from "../services/characterService";

export const useCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const data = await getCharacters();
            setCharacters(data);
            setFiltered(data);
        };

        fetchCharacters();
    }, []);

    const searchCharacter = (name) => {
        const result = characters.filter((char) =>
            char.name.toLowerCase().includes(name.toLowerCase())
        );

        setFiltered(result);
    };

    return { filtered, searchCharacter };
};