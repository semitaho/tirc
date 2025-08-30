import { useEffect, useState } from "react";

let notification = null;
const originalTitle = document.title;
export function useNotify() {
  const [newMessagesCounter, setNewMessagesCounter] = useState(0);
  const notify = (messageRow) => {
    if (
      Notification.permission === "granted" &&
      messageRow.type === "comment" &&
      document.hidden
    ) {
      console.log("notification will be send!");
      setNewMessagesCounter((messages) => {
        const newMessages = messages + 1;
        document.title = `(${newMessages}) ${originalTitle}`;
        return newMessages;
      });
      const blinkTitle = "Uusi viesti käyttäjältä: " + messageRow.nick;
      if (notification) {
        notification = new Notification(blinkTitle, {
          body: messageRow.line,
        });
      }
    }
  };
  // Request permission on mount
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        console.log("no hidden!");
        document.title = originalTitle;
        setNewMessagesCounter(0);
      } else {
      }
    });
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };
}
