import { useState } from "react";

/**
 * Componente para autenticación y registro de usuarios.
 * Permite alternar entre inicio de sesión y registro, validando campos básicos.
 */

function Login({ onLogin }) {
  // ============ ESTADOS Y UI ============
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    if (isRegistering && !name.trim()) {
      setError("Por favor, introduce tu nombre.");
      return;
    }

    setError("");

    const userData = {
      name: isRegistering ? name.trim() : email.split("@")[0],
      email: email.trim(),
    };

    onLogin(userData);
  };

  // ============ RENDERIZADO ============
  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Family Today</h1>

        {/* Pestañas de selección */}
        <div className="login__tabs">
          <button
            type="button"
            className={`login__tab ${!isRegistering ? "login__tab--active" : ""}`}
            onClick={() => {
              setIsRegistering(false);
              setError("");
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`login__tab ${isRegistering ? "login__tab--active" : ""}`}
            onClick={() => {
              setIsRegistering(true);
              setError("");
            }}
          >
            Registrarse
          </button>
        </div>

        {/* --- Formulario --- */}
        <form className="login__form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="login__field">
              <label className="login__label" htmlFor="name">
                Nombre:
              </label>
              <input
                id="name"
                type="text"
                className="detail__input"
                placeholder="Ej: Mamá"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          {/* Correo */}
          <div className="login__field">
            <label className="login__label" htmlFor="email">
              Correo Electrónico:
            </label>
            <input
              id="email"
              type="email"
              className="detail__input"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          {/* Contraseña */}
          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Contraseña:
            </label>
            <div className="login__password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="detail__input login__input--password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
              />
              <button
                type="button"
                className="login__eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? "🐵" : "🙈"}
              </button>
            </div>
          </div>

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="detail__btn">
            {isRegistering ? "Crear Cuenta Familiar" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
