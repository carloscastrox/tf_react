import React from 'react'

export const Footer = () => {
    return (
        <footer className="py-4 bg-dark border-top mt-auto">
            <div className="container d-flex flex-column flex-lg-row align-items-center justify-content-between">
                <div className="text-secondary small">
                    © {new Date().getFullYear()} Moni. Todos los derechos reservados.
                </div>
                <ul className="nav small">
                    <li className="nav-item">
                        <a className="nav-link text-secondary" href="#">Términos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-secondary" href="#">Privacidad</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-secondary" href="#">Soporte</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
