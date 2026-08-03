import Appointments from "./Appointments";
import Medication from "./Medication";
import MedicalInfo from "./MedicalInfo";
import Contacts from "./Contacts";
import Expenses from "./Expenses";

function Detail({
  sectionId,
  onBack,
  appointments,
  setAppointments,
  meds,
  setMeds,
  medicalInfo,
  setMedicalInfo,
  contacts,
  setContacts,
  expenses,
  setExpenses,
  onOpenModal,
}) {
  return (
    <section className={`detail detail--${sectionId}`}>
      <div className="detail__content">
        {/* ====   CITAS ====*/}
        {sectionId === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            onOpenModal={onOpenModal}
            onBack={onBack}
          />
        )}

        {/* ====   MEDICACIÓN ====*/}
        {sectionId === "meds" && (
          <Medication meds={meds} setMeds={setMeds} onBack={onBack} />
        )}

        {/* ====   INFORMACIÓN MÉDICA ====*/}
        {sectionId === "medical-info" && (
          <MedicalInfo
            medicalInfo={medicalInfo}
            setMedicalInfo={setMedicalInfo}
            onBack={onBack}
          />
        )}

        {/* ==== TELÉFONOS  ==== */}
        {sectionId === "contacts" && (
          <Contacts
            contacts={contacts}
            setContacts={setContacts}
            onBack={onBack}
          />
        )}

        {/* ==== GASTOS ==== */}
        {sectionId === "expenses" && (
          <Expenses
            expenses={expenses}
            setExpenses={setExpenses}
            onBack={onBack}
          />
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
