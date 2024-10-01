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

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      setCurrentUser(result.user);
      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      throw error;
    }
  };


  const logout = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); 
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    if (currentUser) {
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
    return null; 
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
