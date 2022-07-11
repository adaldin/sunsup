// React
import { createContext, useContext } from "react";
// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase/firebase.js";

export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("there is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <authContext.Provider value={{ signUp }}>{children}</authContext.Provider>
  );
}

export default AuthProvider;
