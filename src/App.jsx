import { useState, useEffect } from "react";
import { db } from "./services/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import ModalNote from "./components/ModalNote";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";

function App() {
  //  ESTADOS DE USUARIO Y NAVEGACIÓN
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeSection, setActiveSection] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);
  const [modalNoteText, setModalNoteText] = useState("");

  //  ESTADOS DE LOS DATOS DE LA APLICACIÓN
  const [appointments, setAppointments] = useState([]);
  const [meds, setMeds] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [documents, setDocuments] = useState([]);

  //  SINCRONIZACIÓN EN TIEMPO REAL (LECTURA)
  useEffect(() => {
    // Usamos user.uid directamente en vez de auth.currentUser
    if (user && !user.isGuest && user.uid) {
      const userId = user.uid;
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

      const unsubscribes = collections.map((colName, index) => {
        const docRef = doc(db, "users", userId, "data", colName);

        return onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setters[index](docSnap.data().items || []);
          } else {
            setters[index]([]);
          }
        });
      });

      return () => unsubscribes.forEach((unsub) => unsub());
    }
  }, [user]);

  //  FUNCIÓN AUXILIAR DE ESCRITURA EN LA NUBE
  // Función para guardar en Firestore de forma controlada.

  const updateCloudData = async (collectionName, newItems) => {
    if (user && !user.isGuest && user.uid) {
      const userId = user.uid;
      try {
        await setDoc(doc(db, "users", userId, "data", collectionName), {
          items: newItems,
        });
      } catch (error) {
        console.error("Error al guardar en Firebase:", error);
      }
    }
  };

  //  MANEJADORES DE DATOS (ESTADO + NUBE)
  const handleAppointmentsChange = (newAppointments) => {
    setAppointments(newAppointments);
    updateCloudData("appointments", newAppointments);
  };

  const handleMedsChange = (newMeds) => {
    setMeds(newMeds);
    updateCloudData("meds", newMeds);
  };

  const handleMedicalInfoChange = (newMedicalInfo) => {
    setMedicalInfo(newMedicalInfo);
    updateCloudData("medical_info", newMedicalInfo);
  };

  const handleContactsChange = (newContacts) => {
    setContacts(newContacts);
    updateCloudData("contacts", newContacts);
  };

  const handleExpensesChange = (newExpenses) => {
    setExpenses(newExpenses);
    updateCloudData("expenses", newExpenses);
  };

  const handleDocumentsChange = (newDocuments) => {
    setDocuments(newDocuments);
    updateCloudData("documents", newDocuments);
  };

  // AUTENTICACIÓN Y SESIÓN

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
    setAppointments([]);
    setMeds([]);
    setMedicalInfo([]);
    setContacts([]);
    setExpenses([]);
    setDocuments([]);
  };

  // GESTIÓN DE NOTAS (MODAL)

  const handleOpenNoteModal = (id) => {
    const app = appointments.find((a) => a.id === id);
    if (app) {
      setActiveModalId(id);
      setModalNoteText(app.note || "");
    }
  };

  const handleSaveNote = () => {
    const updatedAppointments = appointments.map((app) =>
      app.id === activeModalId ? { ...app, note: modalNoteText } : app,
    );
    // Usamos la función unificada que actualiza estado y Firebase
    handleAppointmentsChange(updatedAppointments);
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
            setAppointments={handleAppointmentsChange}
            meds={meds}
            setMeds={handleMedsChange}
            medicalInfo={medicalInfo}
            setMedicalInfo={handleMedicalInfoChange}
            contacts={contacts}
            setContacts={handleContactsChange}
            expenses={expenses}
            setExpenses={handleExpensesChange}
            documents={documents}
            setDocuments={handleDocumentsChange}
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
