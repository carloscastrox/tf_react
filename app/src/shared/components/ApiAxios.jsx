import { useEffect, useState } from "react"
import axios from "axios"

export const CharactersAxios = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});
    const [query, setQuery] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get("https://rickandmortyapi.com/api/character/", {
                params: { page, name: query },
                cancelToken: source.token,
            })
            .then(({ data }) => {
                setCharacters(data.results || []);
                setInfo(data.info || {});
            })
            .catch((err) => {
                // Si no hay resultados la API suele responder 404
                if (axios.isCancel(err)) return;
                if (err.response?.status === 404) {
                    setCharacters([]);
                    setInfo({});
                    return;
                }
                console.error(err);
            });

        return () => source.cancel();
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
                        onChange={(e) => (setQuery(e.target.value.trim()), setPage(1))}
                    />
                </div>
            </div>

            <div className="row">
                {characters.map((char) => (
                    <div key={char.id} className="col-md-3 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={char.image} className="card-img-top" alt={char.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{char.name}</h5>
                                <p className="card-text">
                                    {char.species} - {char.status}
                                </p>
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
                >
                    &lt;-- Anterior
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
};