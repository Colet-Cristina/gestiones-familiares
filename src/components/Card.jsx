function Card({ cardData, onSelectCard }) {
  return (
    <article
      className={`card card--${cardData.id}`}
      onClick={() => onSelectCard(cardData.id)}
      role="button"
      tabIndex={0}
    >
      <div className="card__left">
        {/* Cajita con fondo pastel para el icono */}
        <div className="card__icon-box">
          <div className="card__icon-box">{cardData.icon}</div>
        </div>

        <div className="card__content">
          <h3 className="card__title">{cardData.title}</h3>
          {cardData.description && (
            <p className="card__description">{cardData.description}</p>
          )}
        </div>
      </div>

      {/* Flechita de acción */}
      <span className="card__arrow">&rarr;</span>
    </article>
  );
}

export default Card;
