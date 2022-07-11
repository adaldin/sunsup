// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import keys from "../../keys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.REACT_APP_FIREBASE_KEY;
// TODO ESTO DEBERIA IR A ENV
const firebaseConfig = keys;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
