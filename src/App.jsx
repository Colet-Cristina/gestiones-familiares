import { useState, useEffect } from "react";

// ============ IMPORTACIÓN DE COMPONENTES ============

import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import ModalNote from "./components/ModalNote";
import Footer from "./components/Footer";

/**
 * Componente principal de la aplicación.
 * Administra el estado global de autenticación, navegación entre módulos
 * y la persistencia de datos en almacenamiento local (localStorage).
 */
function App() {
  // ============ ESTADO DE AUTENTICACIÓN Y SESIÓN ============

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ============ ESTADOS DE NAVEGACIÓN ============

  const [activeSection, setActiveSection] = useState(null);

  // Control del estado para la ventana modal de notas
  const [activeModalId, setActiveModalId] = useState(null);
  const [modalNoteText, setModalNoteText] = useState("");

  // ============ ESTADOS DE DOMINIO (PERSISTENCIA LOCAL) ============

  // --- Citas Médicas ---
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // --- Medicación ---
  const [meds, setMeds] = useState(() => {
    const saved = localStorage.getItem("meds");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("meds", JSON.stringify(meds));
  }, [meds]);

  // --- Información Médica General ---
  const [medicalInfo, setMedicalInfo] = useState(() => {
    const saved = localStorage.getItem("medical_info");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("medical_info", JSON.stringify(medicalInfo));
  }, [medicalInfo]);

  // --- Contactos / Directorio ---
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // --- Control de Gastos ---
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [{ id: "1", concept: "Farmacia - Medicinas", amount: "24.50" }];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // --- Documentación ---
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

  // ============ MANEJADORES DE EVENTOS (HANDLERS) ============

  /**
   * Registra la sesión activa del usuario y actualiza el storage.
   */
  const handleLogin = (userData) => {
    setUser(userData);
    setActiveSection(null); // Vuelve siempre al Dashboard principal al entrar
    localStorage.setItem("app_user", JSON.stringify(userData));
  };

  /**
   * Cierra la sesión activa y limpia las credenciales guardadas.
   */
  const handleLogout = () => {
    setUser(null);
    setActiveSection(null); // Vuelve a la landing/dashboard al salir
    setActiveModalId(null);
    localStorage.removeItem("app_user");
  };

  /**
   * Abre el modal de edición de notas para una cita específica.
   */
  const handleOpenNoteModal = (id) => {
    const app = appointments.find((a) => a.id === id);
    if (app) {
      setActiveModalId(id);
      setModalNoteText(app.note || "");
    }
  };

  /**
   * Guarda los cambios de la nota editada dentro del estado de citas.
   */
  const handleSaveNote = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === activeModalId ? { ...app, note: modalNoteText } : app,
      ),
    );
    setActiveModalId(null);
  };

  const selectedAppointment = appointments.find((a) => a.id === activeModalId);

  // ============ RENDERIZADO CONDICIONAL (GUARDA AUTENTICACIÓN) ============

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // ============ RENDERIZADO PRINCIPAL DE LA APLICACIÓN ============

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

        {/* Modal global de notas */}
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
