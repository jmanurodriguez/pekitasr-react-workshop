import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYfQSI9Mx2Ir_s3hx6KeUwCgY9HSK57bM",
  authDomain: "proyecto-pekitas-ecotienda.firebaseapp.com",
  projectId: "proyecto-pekitas-ecotienda",
  storageBucket: "proyecto-pekitas-ecotienda.appspot.com",
  messagingSenderId: "500546853920",
  appId: "1:500546853920:web:043269018bbfba59017045",
  measurementId: "G-JPELE23H4N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
  } catch (error) {
  console.error("Error al iniciar sesión con Google:", error);
  throw error;
  }
};

export const logOut = async () => {
  try {
  await signOut(auth);
  } catch (error) {
  console.error("Error al cerrar sesión:", error);
  throw error;
  }
};

export { auth };
