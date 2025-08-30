import { useEffect } from "react";



export function useNotify() {

   const notify = (messageRow) => {
     if (Notification.permission === "granted" && messageRow.type === 'comment') {
      new Notification("Uusi viesti käyttäjältä: "+messageRow.nick, {
        body: messageRow.line
      });
    }

  };
  // Request permission on mount
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };

};
