import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  where,
  query,
  getDoc,
  getDocs,
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
const DATA_FROM_LAST_HOURS = 5;

const usePhantomMessages = () => {
  const PHANTOM_COLLECTION = 'phantomrows';
  const [phantomMessages, setPhantomMessages] = useState([]);
  const phantomMessagesJson = JSON.stringify(phantomMessages);

  async function getPhantomMessages() {
    const q = query(collection(db,  PHANTOM_COLLECTION));
    onSnapshot(q, (snapshot) => {
      const phantomRows = snapshot.docs.map((doc) => doc.data());
      setPhantomMessages([]);
    });
  }

  useEffect(() => {
    getPhantomMessages();
  }, [phantomMessagesJson]);

  async function savePhantomMessage(tila, nick) {
    const q = query(
      collection(db, PHANTOM_COLLECTION),
      where("nick", "==", nick)
    );
    const docs = await getDocs(q);
    if (!docs.empty) {
      console.log("on olemassa phantom rivi!", docs.docs[0].data());
      const savedDoc = docs.docs[0].data;

      const docRef = docs.docs[0].ref;
      const updatingDoc = { ...savedDoc, state: tila };
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
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    const time =
      new Date().getTime() - DATA_FROM_LAST_HOURS - 12 * 60 * 60 * 1000;
    const q = query(collection(db, "messages"), where("time", ">", time));
    onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs
        .map((doc) => doc.data())
        .filter((docdata) => docdata.type !== "phantom");
      setMessages(allMessages);
    });
  }
  useEffect(() => {
    getMessages();
  }, [messages.length]);

  return {
    messages,
    sendMessage,
  };
};

export { useMessages, sendMessage, usePhantomMessages };
