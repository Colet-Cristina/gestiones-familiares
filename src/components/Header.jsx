function Header({ familyName, onLogout }) {
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
