import Appointments from "./Appointments";
import Medication from "./Medication";
import MedicalInfo from "./MedicalInfo";
import Contacts from "./Contacts";
import Expenses from "./Expenses";
import Documents from "./Documents";

/**
 * Componente contenedor que renderiza dinámicamente la sección de detalle
 * seleccionada por el usuario (Citas, Medicación, Info Médica, etc.).
 */

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
  documents,
  setDocuments,
  onOpenModal,
}) {
  // ============ RENDERIZADO ============
  return (
    <section className={`detail detail--${sectionId}`}>
      <div className="detail__content">
        {/* ==== Citas ==== */}
        {sectionId === "appointments" && (
          <Appointments
            appointments={appointments}
            setAppointments={setAppointments}
            onOpenModal={onOpenModal}
            onBack={onBack}
          />
        )}

        {/* ==== Medicación ==== */}
        {sectionId === "meds" && (
          <Medication meds={meds} setMeds={setMeds} onBack={onBack} />
        )}

        {/* ==== Información médica ==== */}
        {sectionId === "medical-info" && (
          <MedicalInfo
            medicalInfo={medicalInfo}
            setMedicalInfo={setMedicalInfo}
            onBack={onBack}
          />
        )}

        {/* ==== Teléfonos ==== */}
        {sectionId === "contacts" && (
          <Contacts
            contacts={contacts}
            setContacts={setContacts}
            onBack={onBack}
          />
        )}

        {/* ==== Gastos ==== */}
        {sectionId === "expenses" && (
          <Expenses
            expenses={expenses}
            setExpenses={setExpenses}
            onBack={onBack}
          />
        )}

        {/* ==== Documentos ==== */}
        {sectionId === "documents" && (
          <Documents
            documents={documents}
            setDocuments={setDocuments}
            onBack={onBack}
          />
        )}
      </div>
    </section>
  );
}

export default Detail;
