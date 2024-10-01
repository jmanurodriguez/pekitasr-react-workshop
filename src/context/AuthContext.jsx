import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithEmail,
  signInWithGoogle,
  logOut
} from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Registro con email y contraseña
  const signup = async (email, password) => {
    try {
      const userCredential = await registerWithEmailAndPassword(email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  // Iniciar sesión con email y contraseña
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmail(email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error en inicio de sesión con email:", error);
      throw error;
    }
  };

  // Iniciar sesión con Google usando pop-up
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      setCurrentUser(result.user);
      navigate('/'); // Redirigir después de una autenticación exitosa
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      navigate('/login'); // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Vigilar cambios en el usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Cambiar a false una vez que se ha verificado el usuario
    });

    return unsubscribe;
  }, []);

  // Solo redirigir si hay un usuario autenticado
  useEffect(() => {
    if (currentUser) {
      console.log("Usuario autenticado, no redirigir automáticamente");
    }
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  if (loading) {
    return null; // O un loader mientras se verifica el estado del usuario
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
