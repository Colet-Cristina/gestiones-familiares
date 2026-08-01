function Header({ familyName }) {
  return (
    <header className="header">
      <h1 className="header__title">Gestiones Familiares</h1>
      <p className="header__subtitle">{familyName}</p>
    </header>
  );
}

export default Header;
