/**
 * Componente funcional para el pie de página de la aplicación.
 * Muestra el copyright y el nombre del proyecto.
 */
import logo from "../images/logo-family-today.png";

function Footer() {
  // ============ RENDERIZADO ============
  return (
    <footer className="footer">
      <div className="footer__content">
        <img src={logo} alt="" className="footer__logo" />
        <p className="footer__copy">&copy; 2026 Gestiones Familiares</p>
      </div>
    </footer>
  );
}

export default Footer;
