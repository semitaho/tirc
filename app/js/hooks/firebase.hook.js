// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { use, useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { db } from "../firebase.config.js";
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
