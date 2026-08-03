import { useState, useEffect } from "react";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import ModalNote from "./components/ModalNote";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState(null); // 'appointments', 'meds', etc.
  const [familyName] = useState(
    () => localStorage.getItem("familyName") || "familiar",
  );

  // Estado para la modal
  const [activeModalId, setActiveModalId] = useState(null);
  const [modalNoteText, setModalNoteText] = useState("");

  // Estado general de citas
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    // Si hay algo guardado en localStorage lo usamos, si no, empezamos con []
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Estado general de medicación
  const [meds, setMeds] = useState(() => {
    const savedMeds = localStorage.getItem("meds");
    return savedMeds ? JSON.parse(savedMeds) : [];
  });

  useEffect(() => {
    localStorage.setItem("meds", JSON.stringify(meds));
  }, [meds]);

  // Estado para Información Médica
  const [medicalInfo, setMedicalInfo] = useState(() => {
    const saved = localStorage.getItem("medical_info");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("medical_info", JSON.stringify(medicalInfo));
  }, [medicalInfo]);

  // Estado para Teléfonos
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Estado para Gastos
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [{ id: "1", concept: "Farmacia - Medicinas", amount: "24.50" }];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Estado para Documentos
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("documents");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            title: "DNI",
            owner: "Mamá",
            location: "Carpeta roja de la entrada",
            expirationDate: "2028-10-15",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  // Abrir Modal
  const handleOpenNoteModal = (id) => {
    const app = appointments.find((a) => a.id === id);
    if (app) {
      setActiveModalId(id);
      setModalNoteText(app.note || "");
    }
  };

  // Guardar Nota
  const handleSaveNote = () => {
    setAppointments(
      appointments.map((app) =>
        app.id === activeModalId ? { ...app, note: modalNoteText } : app,
      ),
    );
    setActiveModalId(null);
  };

  const selectedAppointment = appointments.find((a) => a.id === activeModalId);

  return (
    <div className="page">
      <Header familyName={familyName} />

      <main className="main">
        {!activeSection ? (
          <Dashboard
            onSelectCard={(sectionId) => setActiveSection(sectionId)}
          />
        ) : (
          <Detail
            sectionId={activeSection}
            onBack={() => setActiveSection(null)}
            appointments={appointments}
            setAppointments={setAppointments}
            meds={meds}
            setMeds={setMeds}
            medicalInfo={medicalInfo}
            setMedicalInfo={setMedicalInfo}
            contacts={contacts}
            setContacts={setContacts}
            expenses={expenses}
            setExpenses={setExpenses}
            documents={documents}
            setDocuments={setDocuments}
            onOpenModal={handleOpenNoteModal}
          />
        )}

        <ModalNote
          isOpen={Boolean(activeModalId)}
          appointment={selectedAppointment}
          noteText={modalNoteText}
          setNoteText={setModalNoteText}
          onSave={handleSaveNote}
          onClose={() => setActiveModalId(null)}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
