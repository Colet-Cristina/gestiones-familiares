import {
  FaCalendarAlt,
  FaPills,
  FaHeartbeat,
  FaPhoneAlt,
  FaWallet,
  FaFolderOpen,
} from "react-icons/fa";

export const initialCards = [
  {
    id: "appointments",
    title: "Citas",
    icon: <FaCalendarAlt />,
  },
  {
    id: "meds",
    title: "Medicación",
    icon: <FaPills />,
  },
  {
    id: "medical-info",
    title: "Información médica",
    icon: <FaHeartbeat />,
  },
  {
    id: "contacts",
    title: "Teléfonos",
    icon: <FaPhoneAlt />,
  },
  {
    id: "expenses",
    title: "Gastos",
    icon: <FaWallet />,
  },
  {
    id: "documents",
    title: "Documentos",
    icon: <FaFolderOpen />,
  },
];
