import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { useNotify } from "./notification.hook";

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  where,
  query,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const sendMessage = async (nick, type, line) => {
  const time = Date.now();
  const docRef = doc(db, "messages", time.toString());
  await setDoc(docRef, {
    nick,
    type,
    line,
    time,
    source: "TIRC",
  });
  console.log("send text success!");
};

const usePhantomMessages = () => {
  const PHANTOM_COLLECTION = "phantomrows";
  const [phantomMessages, setPhantomMessages] = useState([]);
  const phantomMessagesJson = JSON.stringify(phantomMessages);

  async function getPhantomMessages() {
    const q = query(collection(db, PHANTOM_COLLECTION));
    onSnapshot(q, (snapshot) => {
      const phantomRows = snapshot.docs.map((doc) => doc.data());
      setPhantomMessages(phantomRows);
    });
  }

  useEffect(() => {
    getPhantomMessages();
  }, [phantomMessagesJson]);

  async function savePhantomMessage(tila, nick) {
    console.log("nick is", nick);
    const q = query(
      collection(db, PHANTOM_COLLECTION),
      where("nick", "==", nick)
    );

    if (tila === "idle") {
      const snapshot = await getDocs(q);
      snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      return;
    }

    const docs = await getDocs(q);
    if (!docs.empty) {
      const savedDoc = docs.docs[0].data();

      const docRef = docs.docs[0].ref;
      const updatingDoc = { ...savedDoc, state: tila };
      console.log("updating doc", savedDoc);
      await setDoc(docRef, updatingDoc);
    } else {
      const time = Date.now();
      const docRef = doc(db, PHANTOM_COLLECTION, time.toString());
      await setDoc(docRef, {
        nick,
        state: tila,
        time,
        source: "TIRC",
      });
    }
  }
  return {
    phantomMessages,
    savePhantomMessage,
  };
};

const useMessages = () => {
  const { notify } = useNotify();

  const DATA_FROM_LAST_HOURS = 24;
  const time = new Date().getTime() - DATA_FROM_LAST_HOURS * 60 * 60 * 1000;
  const [messages, setMessages] = useState([]);
  const [activeMessages, setActiveMessages] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alkulataus = true;
    const q = query(collection(db, "messages"), where("time", ">", time));
    const unsubsribe = onSnapshot(q, (snapshot) => {
      if (alkulataus) {
        const allMessages = snapshot.docs
          .map((doc) => doc.data())
          .filter((docdata) => docdata.type !== "phantom");
        setMessages(allMessages);
        console.log("messaged initialization load done!");
        alkulataus = false;
        setReady(true);
      } else {
        console.log("doc changes length:", snapshot.docChanges().length);
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            notify(change.doc.data());

            setActiveMessages((prev) => {
              const activeMessage = {
                ...change.doc.data(),
                active: true,
                first: prev.length == 0,
              };
              return [...prev, activeMessage];
            });
            // setMessages((prev) => [...prev, change.doc.data()]);
          }
        });
      }
    });
    return () => unsubsribe();
  }, []);

  return {
    messages,
    activeMessages,
    sendMessage,
  };
};

export { useMessages, sendMessage, usePhantomMessages };
