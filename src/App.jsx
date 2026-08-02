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
