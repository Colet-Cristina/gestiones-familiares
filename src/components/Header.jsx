/**
 * Componente para la cabecera principal de la aplicación.
 * Muestra el título del proyecto, el nombre de la familia actual y el botón para cerrar sesión.
 */

function Header({ familyName, onLogout }) {
  // ============ RENDERIZADO ============
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__titles">
          <h1 className="header__title">Family Today</h1>
          <p className="header__subtitle">{familyName || "Familia"}</p>
        </div>
        <button
          type="button"
          className="header__logout-btn"
          onClick={onLogout}
          title="Cerrar sesión"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
