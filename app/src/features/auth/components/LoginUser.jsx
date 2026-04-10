import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

export const Login = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    // REGEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}<>]).{8,}$/;

    // VALIDACIÓN EMAIL
    const handleEmailChange = (value) => {
        setEmail(value);

        if (!value) {
            setEmailError("El correo es obligatorio");
            setEmailValid(false);
            return;
        }

        if (!emailRegex.test(value)) {
            setEmailError("Correo inválido");
            setEmailValid(false);
        } else {
            setEmailError("");
            setEmailValid(true);
        }
    };

    // VALIDACIÓN PASSWORD
    const handlePasswordChange = (value) => {
        setPassword(value);

        if (!value) {
            setPasswordError("La contraseña es obligatoria");
            setPasswordValid(false);
            return;
        }

        if (!passwordRegex.test(value)) {
            setPasswordError(
                "Mínimo 8 caracteres, una mayúscula y un carácter especial"
            );
            setPasswordValid(false);
        } else {
            setPasswordError("");
            setPasswordValid(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailValid || !passwordValid) return;

        try {
            const res = await loginUser({ email, password });

            // Guardar sesión simple
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("user", JSON.stringify(res.data));

            // Redirigir a dashboard
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error al iniciar sesión");
        }
    };

    return (
        <main id="main-content" tabIndex={-1} className="py-2">
            <div className="container py-5 py-md-5" style={{ maxWidth: 520 }}>
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="text-center fw-bold mb-4">Bienvenido</h3>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* EMAIL */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo electrónico
                                </label>

                                <div className={`input-group ${emailError ? "has-validation" : ""}`}>
                                    <span className="input-group-text">
                                        <i
                                            className={`bi bi-envelope ${emailValid ? "text-success" : "text-secondary"
                                                }`}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <input
                                        id="email"
                                        type="email"
                                        className={`form-control ${emailError ? "is-invalid" : emailValid ? "is-valid" : ""}`}
                                        value={email}
                                        onChange={(e) => handleEmailChange(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        aria-describedby="emailFeedback"
                                    />

                                    {emailError && (
                                        <div id="emailFeedback" className="invalid-feedback">
                                            {emailError}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-2">
                                <label htmlFor="password" className="form-label">
                                    Contraseña
                                </label>

                                <div className={`input-group ${passwordError ? "has-validation" : ""}`}>
                                    <span className="input-group-text">
                                        <i
                                            className={`bi bi-lock ${passwordValid ? "text-success" : "text-secondary"
                                                }`}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control ${passwordError ? "is-invalid" : passwordValid ? "is-valid" : ""}`}
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        placeholder="********"
                                        aria-describedby="passwordHelp passwordFeedback"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        aria-label="Ver Password"
                                        onClick={() => setShowPassword((s) => !s)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                                    </button>

                                    {passwordError && (
                                        <div id="passwordFeedback" className="invalid-feedback">
                                            {passwordError}
                                        </div>
                                    )}
                                </div>

                                {!passwordError && (
                                    <div id="passwordHelp" className="form-text">
                                        Mínimo 8 caracteres, una mayúscula y un carácter especial.
                                    </div>
                                )}
                            </div>

                            {/* OPCIONES */}
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Recordarme
                                    </label>
                                </div>

                                <NavLink to="/forgotpass" className="text-decoration-none small">
                                    ¿Olvidaste tu contraseña?
                                </NavLink>
                            </div>

                            {/* BOTÓN */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 btn-lg mt-4 fw-semibold"
                                disabled={!emailValid || !passwordValid}
                            >
                                Iniciar sesión
                            </button>

                            <div className="text-center my-4">
                                <div className="d-flex align-items-center gap-3">
                                    <hr className="flex-grow-1" />
                                    <span className="text-muted small">o</span>
                                    <hr className="flex-grow-1" />
                                </div>
                            </div>

                            <p className="text-center mb-0 small">
                                ¿No tienes cuenta?{" "}
                                <NavLink to="/register" className="fw-bold text-decoration-none">
                                    Regístrate
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};