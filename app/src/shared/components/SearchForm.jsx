import { useState } from "react";

export const SearchForm = ({ onSearch }) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(name);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2">
            <input className="form-control"
                id="search"
                type="text"
                placeholder="Buscar personaje"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button id="btnsearch" type="submit" className="btn btn-block btn-primary">Buscar</button>
        </form>
    );
};