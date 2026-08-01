import Appointments from "./Appointments";

function Detail({
  sectionId,
  onBack,
  appointments,
  setAppointments,
  onOpenModal,
}) {
  return (
    <section className="detail">
      <button className="detail__back-btn" type="button" onClick={onBack}>
        ← Volver al inicio
      </button>

      <div className="detail__content">
        {sectionId === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            onOpenModal={onOpenModal}
          />
        )}

        {sectionId === "meds" && (
          <>
            <h2 className="detail__title">Gestión de Medicación</h2>
            <form className="detail__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nombre del medicamento"
                className="detail__input"
                required
              />
              <input
                type="text"
                placeholder="Dosis (ej: 1 cada 8h)"
                className="detail__input"
                required
              />
              <button type="submit" className="detail__btn">
                Añadir Medicamento
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Paracetamol 1g - Cada 8 horas</li>
            </ul>
          </>
        )}

        {sectionId === "expenses" && (
          <>
            <h2 className="detail__title">Gastos Familiares</h2>
            <form className="detail__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Concepto (ej: Farmacia)"
                className="detail__input"
                required
              />
              <input
                type="number"
                placeholder="Importe (€)"
                className="detail__input"
                step="0.01"
                required
              />
              <button type="submit" className="detail__btn">
                Registrar Gasto
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Farmacia - 24.50 €</li>
            </ul>
          </>
        )}

        {sectionId === "contacts" && (
          <>
            <h2 className="detail__title">Teléfonos de Interés</h2>
            <form className="detail__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nombre o Centro"
                className="detail__input"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="detail__input"
                required
              />
              <button type="submit" className="detail__btn">
                Guardar Contacto
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Urgencias - 112</li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Detail;
