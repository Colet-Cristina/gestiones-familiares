import Appointments from "./Appointments";

function Detail({
  sectionId,
  onBack,
  appointments,
  setAppointments,
  onOpenModal,
}) {
  return (
    <section className={`detail detail--${sectionId}`}>
      <button className="detail__back-btn" type="button" onClick={onBack}>
        ← Volver
      </button>

      <div className="detail__content">
        {sectionId === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            onOpenModal={onOpenModal}
          />
        )}
        {/* ====   MEDICACIÓN ====*/}
        {sectionId === "meds" && (
          <>
            <h2 className="detail__title">Medicación</h2>
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
                Añadir
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Paracetamol 1g - Cada 8 horas</li>
            </ul>
          </>
        )}
        {/* ====   INFORMACIÓN MÉDICA ====*/}
        {sectionId === "medical-info" && (
          <>
            <h2 className="detail__title">Información Médica</h2>
            <form className="detail__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Dato clave (ej: Grupo sanguíneo, Alergias, Mutua)"
                className="detail__input"
                required
              />
              <input
                type="text"
                placeholder="Detalle (ej: A+, Alergia a la Penicilina)"
                className="detail__input"
                required
              />
              <button type="submit" className="detail__btn">
                Guardar
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Alergias: Penicilina</li>
              <li className="detail__item">Grupo Sanguíneo: A+</li>
            </ul>
          </>
        )}
        {/* ====   TELEFONOS ====*/}
        {sectionId === "contacts" && (
          <>
            <h2 className="detail__title">Teléfonos</h2>
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
                Guardar
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Urgencias - 112</li>
            </ul>
          </>
        )}
        {/* ====   GASTOS ====*/}
        {sectionId === "expenses" && (
          <>
            <h2 className="detail__title">Gastos</h2>
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
                Registrar
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">Farmacia - 24.50 €</li>
            </ul>
          </>
        )}

        {/* ====   DOCUMENTOS ====*/}
        {sectionId === "documents" && (
          <>
            <h2 className="detail__title">Documentos</h2>
            <form className="detail__form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nombre del documento (ej: Analítica Sangre 2026)"
                className="detail__input"
                required
              />
              <input
                type="file"
                className="detail__input"
                accept=".pdf,image/*"
              />
              <button type="submit" className="detail__btn">
                Subir Documento
              </button>
            </form>
            <ul className="detail__list">
              <li className="detail__item">📄 Informe_Cardiologia.pdf</li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

export default Detail;
