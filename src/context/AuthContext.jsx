//src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithEmail,
  signInWithGoogle,
  logOut
} from "../firebase/config";  // Asegúrate de que las funciones estén correctamente importadas

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Registro con email y contraseña
  const signup = async (email, password) => {
    try {
      const userCredential = await registerWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user);  // Guarda el usuario registrado en el estado
      return userCredential.user;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;  // Reenvía el error para ser manejado donde se invoque
    }
  };

  // Iniciar sesión con email y contraseña
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmail(email, password);
      setCurrentUser(userCredential.user);  // Guarda el usuario autenticado
      return userCredential.user;
    } catch (error) {
      console.error("Error en inicio de sesión con email:", error);
      throw error;
    }
  };

  // Iniciar sesión con Google
  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      setCurrentUser(userCredential.user);  // Guarda el usuario autenticado
      return userCredential.user;
    } catch (error) {
      console.error("Error en inicio de sesión con Google:", error);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    await logOut();
    setCurrentUser(null);
  };

  // Vigilar cambios en el usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
