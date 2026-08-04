import Welcome from "./Welcome";
import Card from "./Card";
import { initialCards } from "../services/data.jsx";

function Dashboard({ onSelectCard }) {
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
