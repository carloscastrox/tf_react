import { useEffect, useState } from "react";

export const CharactersQ = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [query, setQuery] = useState(""); //Estado para la busqueda

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${query}`) 
    //Agregamos el parametro de busqueda si q está vacío → trae todos como siempre , si q tiene algo → trae solo personajes cuyo nombre coincida
      .then(res => (res.ok ? res.json() : { results: [], info: {} })) 
      //si r.ok → parsea JSON normal si no → devuelve un objeto vacío con results: [], así el map no falla y solo muestra nada
      .then(data => (setCharacters(data.results || []), setInfo(data.info || {})));
  }, [page, query]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">API Rick y Morty</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Buscar personaje..."
            value={query}
            onChange={e => (setQuery(e.target.value.trim()), setPage(1))} //Al cambiar la búsqueda, actualizamos q y reiniciamos a la página 1 para mostrar resultados desde el inicio
          />
        </div>
      </div>

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
        <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={!info.prev}>
          &lt;-- Anterior
        </button>
        <span className="fw-bold">Página {page}</span>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)} disabled={!info.next}>
          Siguiente --&gt;
        </button>
      </div>
    </div>
  );
};