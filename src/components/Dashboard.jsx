import Welcome from "./Welcome";
import Card from "./Card";
import { initialCards } from "../services/data.jsx";

/**
 * Componente principal del panel de control que renderiza la bienvenida
 * y la rejilla dinámica de tarjetas de acceso a los módulos.
 */

function Dashboard({ onSelectCard }) {
  // ============ RENDERIZADO ============
  return (
    <>
      <Welcome />
      <section className="dashboard">
        {initialCards.map((card) => (
          <Card key={card.id} cardData={card} onSelectCard={onSelectCard} />
        ))}
      </section>
    </>
  );
}

export default Dashboard;
