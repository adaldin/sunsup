// React
import { createContext, useContext } from "react";
// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/firebase/firebase.js";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  // fc que paso por contexto para que quien lo tome venga por la fc a aquí
  async function signUp(email, password) {
    // aquí cuando tenga los parámetros llamo a firebase y su fc
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }
  async function login(email, password) {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  return (
    <authContext.Provider value={{ signUp, login }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
