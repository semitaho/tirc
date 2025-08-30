import { useEffect } from "react";

let notificationActive = false;
let blinkNotification = null;
const originalTitle = document.title;
export function useNotify() {
  const notify = (messageRow) => {
    if (
      Notification.permission === "granted" &&
      messageRow.type === "comment" &&
      document.hidden &&
      !notificationActive
    ) {
      console.log("notification will be send!");
      const blinkTitle = "Uusi viesti käyttäjältä: " + messageRow.nick;
      const notification = new Notification(blinkTitle, {
        body: messageRow.line,
      });

      blinkNotification = setInterval(() => {
        if (document.title === originalTitle) {
          document.title = blinkTitle;
        } else {
          document.title = originalTitle;
        }
      }, 100);

      notificationActive = true;
      notification.addEventListener("close", () => {
        notificationActive = false;
        alert("onclose event triggered!");
      });
      notification.addEventListener("click", () => {
        notificationActive = false;
        alert("onclick event triggered!");
      });
    }
  };
  // Request permission on mount
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        notificationActive = false;
        console.log("no hidden!");
        clearInterval(blinkNotification);
        document.title = originalTitle;
      } else {
      }
    });
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };
}
