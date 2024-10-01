// src/firebase/config.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup, // Usar signInWithPopup
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYfQSI9Mx2Ir_s3hx6KeUwCgY9HSK57bM",
  authDomain: "proyecto-pekitas-ecotienda.firebaseapp.com",
  projectId: "proyecto-pekitas-ecotienda",
  storageBucket: "proyecto-pekitas-ecotienda.appspot.com",
  messagingSenderId: "500546853920",
  appId: "1:500546853920:web:043269018bbfba59017045",
  measurementId: "G-JPELE23H4N"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Función para registrar un usuario con email y contraseña
export const registerWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión con email y contraseña
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión con Google usando pop-up
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); // Opcional: fuerza la selección de cuenta
  return signInWithPopup(auth, provider); // Usar signInWithPopup
};

// Función para cerrar sesión
export const logOut = () => {
  return signOut(auth);
};
