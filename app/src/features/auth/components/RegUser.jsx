import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../services/authApi";

export const Register = () => {
  // UI
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // API response messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Regex (mismo enfoque del anterior)
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const passwordRegex = useMemo(
    () => /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    []
  );

  // Valid flags
  const fullNameValid = !fullNameError && fullName.trim().length > 0;
  const emailValid = !emailError && email.length > 0;
  const passwordValid = !passwordError && password.length > 0;
  const confirmValid = !confirmError && confirmPassword.length > 0;

  const formValid = fullNameValid && emailValid && passwordValid && confirmValid;

  // Validations
  const handleFullNameChange = (value) => {
    setFullName(value);

    const trimmed = value.trim();
    if (!trimmed) {
      setFullNameError("El nombre completo es obligatorio");
      return;
    }

    // Regla simple (puedes ajustarla): al menos 3 caracteres y dos palabras opcional
    if (trimmed.length < 3) {
      setFullNameError("Ingresa un nombre válido");
      return;
    }

    setFullNameError("");
  };

  const handleEmailChange = (value) => {
    setEmail(value);

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

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (!value) {
      setPasswordError("La contraseña es obligatoria");
      // si cambia password, revalida confirm
      if (confirmPassword) setConfirmError("Las contraseñas no coinciden");
      return;
    }

    if (!passwordRegex.test(value)) {
      setPasswordError("Mínimo 8 caracteres, una mayúscula y un carácter especial");
      if (confirmPassword) setConfirmError("Las contraseñas no coinciden");
      return;
    }

    setPasswordError("");

    // Revalidar confirmación si ya existe
    if (confirmPassword && confirmPassword !== value) {
      setConfirmError("Las contraseñas no coinciden");
    } else if (confirmPassword && confirmPassword === value) {
      setConfirmError("");
    }
  };

  const handleConfirmChange = (value) => {
    setConfirmPassword(value);

    if (!value) {
      setConfirmError("Confirma tu contraseña");
      return;
    }

    if (value !== password) {
      setConfirmError("Las contraseñas no coinciden");
      return;
    }

    setConfirmError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Forzar validaciones existentes (NO se tocan)
    handleFullNameChange(fullName);
    handleEmailChange(email);
    handlePasswordChange(password);
    handleConfirmChange(confirmPassword);

    if (!formValid) return;

    // Limpia mensajes previos
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await registerUser({
        fullName,
        email,
        password,
      });

      setSuccessMessage("Usuario creado correctamente. Ya puedes iniciar sesión.");
      console.log(res.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Ocurrió un error al registrar el usuario"
      );
      console.error(error.response?.data);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="py-2">
      <div className="container py-5 py-md-5" style={{ maxWidth: 520 }}>
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center fw-bold mb-4">Crear cuenta</h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* NOMBRE COMPLETO */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Nombre completo
                </label>

                <div className={`input-group ${fullNameError ? "has-validation" : ""}`}>
                  <span className="input-group-text">
                    <i
                      className={`bi bi-person ${fullNameValid ? "text-success" : "text-secondary"
                        }`}
                      aria-hidden="true"
                    />
                  </span>

                  <input
                    id="fullName"
                    type="text"
                    className={`form-control ${fullNameError ? "is-invalid" : fullNameValid ? "is-valid" : ""
                      }`}
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e.target.value)}
                    placeholder="Ej: Carlos Andrés Castro"
                    aria-describedby="fullNameFeedback"
                  />

                  {fullNameError && (
                    <div id="fullNameFeedback" className="invalid-feedback">
                      {fullNameError}
                    </div>
                  )}
                </div>
              </div>

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
                    className={`form-control ${emailError ? "is-invalid" : emailValid ? "is-valid" : ""
                      }`}
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
              <div className="mb-3">
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
                    className={`form-control ${passwordError ? "is-invalid" : passwordValid ? "is-valid" : ""
                      }`}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="********"
                    aria-describedby="passwordHelp passwordFeedback"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    aria-label="Ver contraseña"
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

              {/* CONFIRM PASSWORD */}
              <div className="mb-2">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar contraseña
                </label>

                <div className={`input-group ${confirmError ? "has-validation" : ""}`}>
                  <span className="input-group-text">
                    <i
                      className={`bi bi-shield-lock ${confirmValid ? "text-success" : "text-secondary"
                        }`}
                      aria-hidden="true"
                    />
                  </span>

                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    className={`form-control ${confirmError ? "is-invalid" : confirmValid ? "is-valid" : ""
                      }`}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                    placeholder="********"
                    aria-describedby="confirmFeedback"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    aria-label="Ver confirmación de contraseña"
                    onClick={() => setShowConfirm((s) => !s)}
                  >
                    <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} />
                  </button>

                  {confirmError && (
                    <div id="confirmFeedback" className="invalid-feedback">
                      {confirmError}
                    </div>
                  )}
                </div>
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg mt-4 fw-semibold"
                disabled={!formValid}
              >
                Registrarme
              </button>

              {/* MENSAJES DE ESTADO */}
              {successMessage && (
                <div className="alert alert-success text-center mt-3 mb-0">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger text-center mt-3 mb-0">
                  {errorMessage}
                </div>
              )}

              {/* Separador */}
              <div className="text-center my-4">
                <div className="d-flex align-items-center gap-3">
                  <hr className="flex-grow-1" />
                  <span className="text-muted small">o</span>
                  <hr className="flex-grow-1" />
                </div>
              </div>

              <p className="text-center mb-0 small">
                ¿Ya tienes cuenta?{" "}
                <NavLink to="/login" className="text-decoration-none fw-bold">
                  Inicia sesión
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};