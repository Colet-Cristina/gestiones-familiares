import { useState, useEffect } from "react";
import { db } from "./services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

  // Estados iniciales vacíos
  const [appointments, setAppointments] = useState([]);
  const [meds, setMeds] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Cargar datos de Firebase al iniciar
  useEffect(() => {
    if (user && !user.isGuest) {
      const fetchData = async () => {
        const collections = [
          "appointments",
          "meds",
          "medical_info",
          "contacts",
          "expenses",
          "documents",
        ];
        const setters = [
          setAppointments,
          setMeds,
          setMedicalInfo,
          setContacts,
          setExpenses,
          setDocuments,
        ];

        for (let i = 0; i < collections.length; i++) {
          const docRef = doc(db, "data", collections[i]);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setters[i](docSnap.data().items);
          }
        }
      };
      fetchData();
    }
  }, [user]);

  // Guardar en Firebase cuando cambia el estado (solo si hay usuario real, no invitado)
  useEffect(() => {
    if (user && !user.isGuest) {
      setDoc(doc(db, "data", "appointments"), { items: appointments });
      setDoc(doc(db, "data", "meds"), { items: meds });
      setDoc(doc(db, "data", "medical_info"), { items: medicalInfo });
      setDoc(doc(db, "data", "contacts"), { items: contacts });
      setDoc(doc(db, "data", "expenses"), { items: expenses });
      setDoc(doc(db, "data", "documents"), { items: documents });
    }
  }, [appointments, meds, medicalInfo, contacts, expenses, documents, user]);

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
      <Header
        familyName={user?.name}
        onLogout={handleLogout}
        onGoHome={() => setActiveSection(null)}
      />
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
