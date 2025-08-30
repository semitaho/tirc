import { useEffect } from "react";

let newMessagesCounter = 0;
let notification = null;
const originalTitle = document.title;
export function useNotify() {
  const notify = (messageRow) => {
    if (
      Notification.permission === "granted" &&
      messageRow.type === "comment" &&
      document.hidden
    ) {
      console.log("notification will be send!");
      newMessagesCounter++;
      const blinkTitle = "Uusi viesti käyttäjältä: " + messageRow.nick;
      if (notification) {
        notification = new Notification(blinkTitle, {
          body: messageRow.line,
        });
      }

      document.title = `(${newMessagesCounter}) ${originalTitle}`;
    }
  };
  // Request permission on mount
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        console.log("no hidden!");
        document.title = originalTitle;
        newMessagesCounter = 0;
      } else {
      }
    });
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };
}
