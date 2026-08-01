function Card({ cardData, onSelectCard }) {
  return (
    <article className={`card card--${cardData.id}`}>
      <div className="card__content">
        <h3 className="card__title">{cardData.title}</h3>
        <p className="card__description">{cardData.description}</p>
      </div>
      <button
        className={`card__btn js-btn-${cardData.id}`}
        type="button"
        onClick={() => onSelectCard(cardData.id)}
      >
        Gestionar
      </button>
    </article>
  );
}

export default Card;
