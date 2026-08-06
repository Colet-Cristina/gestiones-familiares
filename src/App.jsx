import { useState, useEffect } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import ModalNote from "./components/ModalNote";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeSection, setActiveSection] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);
  const [modalNoteText, setModalNoteText] = useState("");

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const [meds, setMeds] = useState(() => {
    const saved = localStorage.getItem("meds");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("meds", JSON.stringify(meds));
  }, [meds]);

  const [medicalInfo, setMedicalInfo] = useState(() => {
    const saved = localStorage.getItem("medical_info");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("medical_info", JSON.stringify(medicalInfo));
  }, [medicalInfo]);

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [{ id: "1", concept: "Farmacia - Medicinas", amount: "24.50" }];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveSection(null);
    localStorage.setItem("app_user", JSON.stringify(userData));
  };

  const handleGuestLogin = () => {
    const guestUser = { name: "Prueba sin registro", isGuest: true };
    setUser(guestUser);
    setActiveSection(null);
    localStorage.setItem("app_user", JSON.stringify(guestUser));
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection(null);
    setActiveModalId(null);
    localStorage.removeItem("app_user");
  };

  const handleOpenNoteModal = (id) => {
    const app = appointments.find((a) => a.id === id);
    if (app) {
      setActiveModalId(id);
      setModalNoteText(app.note || "");
    }
  };

  const handleSaveNote = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === activeModalId ? { ...app, note: modalNoteText } : app,
      ),
    );
    setActiveModalId(null);
  };

  const selectedAppointment = appointments.find((a) => a.id === activeModalId);

  if (!user) {
    return <Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} />;
  }

  return (
    <div className="page">
      <Header familyName={user?.name} onLogout={handleLogout} />

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
      <ScrollTopButton />
    </div>
  );
}

export default App;
