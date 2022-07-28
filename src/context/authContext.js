// React
import { createContext, useContext, useEffect, useState } from "react";
// Firebase
import { auth } from "../components/firebase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

//******CONTEXT*/
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

//******LOGIC*/
export function AuthProvider({ children }) {
  //******STATES*/
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // fc que paso por contexto para que quien lo tome venga por la fc a aquí
  async function signUp(email, password) {
    // aquí cuando tenga los parámetros llamo a firebase y su fc
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    signOut(auth);
  }

  //******USE EFFECT*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <authContext.Provider value={{ signUp, login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
