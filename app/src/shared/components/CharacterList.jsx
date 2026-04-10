import { CharacterCard } from "./CharacterCard";

export const CharacterList = ({ characters }) => {
    return (
        <>
           <div className="row">
            {characters.map(character => (
                <div key={character.id} className="col-12 col-sm-6 col-md-3 mb-4">
                    <div className="card h-100">
                        <img src={character.image} className="card-img-top" alt={character.name} />
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                            <p className="card-text">{character.species}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};