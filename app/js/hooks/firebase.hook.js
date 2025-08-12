// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { use, useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKpmYxVRYRqePZ7UQ5Mintu_08KbM26YQ",
  authDomain: "tirc-40754.firebaseapp.com",
  projectId: "tirc-40754",
  storageBucket: "tirc-40754.firebasestorage.app",
  messagingSenderId: "1092107878398",
  appId: "1:1092107878398:web:f6e582d3412814349f4aaf",
  measurementId: "G-JY5LWD0EXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useData = (collectionName) => {
  const [data, setData] = useState([]);
  console.log("Nicks from Firestore:");

  useEffect(() => {
    async function fetchData(collectionName) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    }
    fetchData(collectionName);

  }, [collection]);
  return [ data ];
};
