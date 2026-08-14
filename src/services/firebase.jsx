import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgI_rLLdyiVbar3amJxN-TC1-bE3UVW-0",
  authDomain: "family-today-d0971.firebaseapp.com",
  projectId: "family-today-d0971",
  storageBucket: "family-today-d0971.firebasestorage.app",
  messagingSenderId: "974946318992",
  appId: "1:974946318992:web:b553d56df6441fee797615",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (la base de datos)
export const db = getFirestore(app);
export const auth = getAuth(app);
