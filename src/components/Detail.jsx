import Appointments from "./Appointments";
import Medication from "./Medication";
import MedicalInfo from "./MedicalInfo";
import Contacts from "./Contacts";
import Expenses from "./Expenses";
import Documents from "./Documents";

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

        {/* ==== DOCUMENTOS ==== */}
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
