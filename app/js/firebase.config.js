
// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnKx5QIDiqC4NzZZrfyH-OAStrUAjNS4o",
  authDomain: "tirc-468716.firebaseapp.com",
  projectId: "tirc-468716",
  storageBucket: "tirc-468716.firebasestorage.app",
  messagingSenderId: "938581311149",
  appId: "1:938581311149:web:78cc73bdf36aa469f2d024",
  measurementId: "G-E7C10TGSVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "tirc-db");
export { db };