import { useState } from "react";
import logo from "../images/logo-family-today.png";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

/**
 * Componente para autenticación y registro de usuarios con Firebase.
 */
function Login({ onLogin, onGuestLogin }) {
  // ============ ESTADOS Y UI ============
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============
  const handleSubmit = async (e) => {
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
    setLoading(true);

    try {
      let userCredential;

      if (isRegistering) {
        // Registro en Firebase
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
      } else {
        // Inicio de sesión en Firebase (se valida contraseña y correo)
        userCredential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
      }

      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: isRegistering
          ? name.trim()
          : user.displayName || email.split("@")[0],
        email: user.email,
      };

      onLogin(userData);
    } catch (err) {
      // Errores de contraseña o correo, capturamos el error
      console.error("Error de autenticación:", err.code);

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Correo o contraseña incorrectos.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado. Prueba a iniciar sesión.");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Ocurrió un error al autenticar. Revisa los datos.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envía un correo electrónico para restablecer la contraseña.
   */
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError(
        "Por favor, introduce tu correo electrónico arriba para recuperar la contraseña.",
      );
      return;
    }

    try {
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      alert(
        "¡Correo enviado! Revisa tu bandeja de entrada para restablecer tu contraseña.",
      );
    } catch (err) {
      console.error("Error al enviar el correo de recuperación:", err.code);

      if (err.code === "auth/user-not-found") {
        setError("No existe ninguna cuenta registrada con este correo.");
      } else if (err.code === "auth/invalid-email") {
        setError("El formato del correo electrónico no es válido.");
      } else {
        setError("Ocurrió un error al enviar el correo de recuperación.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============ RENDERIZADO ============
  return (
    <div className="login">
      <div className="login__card">
        <div className="login__brand">
          <img src={logo} alt="" className="login__logo" />
          <h1 className="login__title visually-hidden">Family Today</h1>
        </div>

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

            {/* Enlace de recuperación de contraseña (solo en Iniciar Sesión) */}
            {!isRegistering && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="login__forgot-btn"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-primary, #6b46c1)",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                  fontSize: "0.85rem",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
              >
                ¿Has olvidado tu contraseña?
              </button>
            )}
          </div>

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="detail__btn" disabled={loading}>
            {loading
              ? "Cargando..."
              : isRegistering
                ? "Crear Cuenta Familiar"
                : "Entrar"}
          </button>
        </form>

        <div className="login__guest-container">
          <button
            type="button"
            className="detail__btn detail__btn--secondary"
            onClick={onGuestLogin}
          >
            Probar sin registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
