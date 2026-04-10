import { useEffect, useState } from "react";

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">API Rick y Morty {() => setPage(page + 1)}</h1>

      <div className="row">
        {characters.map(char => (
          <div key={char.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={char.image} className="card-img-top" alt={char.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{char.name}</h5>
                <p className="card-text">{char.species} - {char.status}</p>
                <p className="card-text">{char.gender}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={!info.prev}
        > &lt;-- Anterior
        </button>

        <span className="fw-bold">Página {page}</span>

        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={!info.next}
        >
          Siguiente --&gt;
        </button>
      </div>
    </div>
  );
}