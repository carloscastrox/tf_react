export const CharacterCard = ({ character }) => {
    return (
        <>
            <div className="card">
                <div className="card-img">
                    <img src={character.image} alt={character.name} width="150" />
                </div>
                <div className="card-body">
                    <h3>{character.name}</h3>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                </div>
            </div>
        </>
    );
};