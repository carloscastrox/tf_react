import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // REGEX (igual que el anterior)
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const emailValid = !emailError && email.length > 0;

  const handleEmailChange = (value) => {
    setEmail(value);
    setSent(false);

    if (!value) {
      setEmailError("El correo es obligatorio");
      return;
    }

    if (!emailRegex.test(value)) {
      setEmailError("Correo inválido");
      return;
    }

    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Forzar validación si intentan enviar sin escribir
    handleEmailChange(email);

    if (!emailRegex.test(email)) return;

    try {
      setLoading(true);

      // Simulación de request (aquí llamas tu API)
      await new Promise((res) => setTimeout(res, 900));

      setSent(true);
      console.log("Solicitud de recuperación enviada a:", email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="py-2">
      <div className="container py-5 py-md-5" style={{ maxWidth: 520 }}>
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center fw-bold mb-2">Recuperar contraseña</h3>
            <p className="text-center text-muted mb-4">
              Ingresa tu correo y te enviaremos un enlace para restablecerla.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* EMAIL */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>

                <div className={`input-group ${emailError ? "has-validation" : ""}`}>
                  <span className="input-group-text">
                    <i
                      className={`bi bi-envelope ${
                        emailValid ? "text-success" : "text-secondary"
                      }`}
                      aria-hidden="true"
                    />
                  </span>

                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      emailError ? "is-invalid" : emailValid ? "is-valid" : ""
                    }`}
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    aria-describedby="emailFeedback"
                    disabled={loading}
                  />

                  {emailError && (
                    <div id="emailFeedback" className="invalid-feedback">
                      {emailError}
                    </div>
                  )}
                </div>

                {!emailError && (
                  <div className="form-text">
                    Usa el correo con el que te registraste.
                  </div>
                )}
              </div>

              {/* ALERTA ÉXITO */}
              {sent && (
                <div className="alert alert-success d-flex align-items-start gap-2 mt-3" role="alert">
                  <i className="bi bi-check-circle-fill mt-1" aria-hidden="true"></i>
                  <div>
                    <div className="fw-semibold">¡Listo!</div>
                    <div className="small">
                      Si el correo existe en el sistema, recibirás un enlace de recuperación en unos minutos.
                    </div>
                  </div>
                </div>
              )}

              {/* BOTÓN */}
              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg mt-4 fw-semibold"
                disabled={!emailValid || loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  "Enviar enlace"
                )}
              </button>

              {/* Separador */}
              <div className="text-center my-4">
                <div className="d-flex align-items-center gap-3">
                  <hr className="flex-grow-1" />
                  <span className="text-muted small">o</span>
                  <hr className="flex-grow-1" />
                </div>
              </div>

              <p className="text-center mb-0 small">
                ¿Ya recordaste tu contraseña?{" "}
                <NavLink to="/login" className="text-decoration-none fw-semibold">
                  Inicia sesión
                </NavLink>
              </p>

              <p className="text-center mb-0 small mt-2">
                ¿No tienes cuenta?{" "}
                <NavLink to="/register" className="text-decoration-none fw-bold">
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