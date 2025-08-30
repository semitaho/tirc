import { useEffect } from "react";



let notificationActive = false;
export function useNotify() {

   const notify = (messageRow) => {
     if (Notification.permission === "granted" 
      && messageRow.type === 'comment'
       && document.hidden 
       && !notificationActive) {
     const notification =  new Notification("Uusi viesti käyttäjältä: "+messageRow.nick, {
        body: messageRow.line
      });
      notificationActive = true;
      notification.onclose(() => {
        notificationActive = false;

      });

       notification.onclick(() => {
        notificationActive = false;

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
