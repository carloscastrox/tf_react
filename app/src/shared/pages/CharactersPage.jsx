import { SearchForm } from "../components/SearchForm";
import { CharacterList } from "../components/CharacterList";
import { useCharacters } from "../hooks/useCharacters";

export const CharactersPage = () => {
    const { filtered, searchCharacter } = useCharacters();

    return (
        <div className="container my-4">
            <h2>API Rick and Morty</h2>
            <div className="card">
                <div className="card-header">
                        <SearchForm onSearch={searchCharacter} />
                        </div>
                <div className="card-body">
                    <CharacterList characters={filtered} />
                </div>
            </div>
        </div>
    );
};