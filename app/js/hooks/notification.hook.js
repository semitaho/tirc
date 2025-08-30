import { useEffect } from "react";

let notificationActive = false;
export function useNotify() {
  const notify = (messageRow) => {
    if (
      Notification.permission === "granted" &&
      messageRow.type === "comment" &&
      document.hidden &&
      !notificationActive
    ) {
      console.log("notification will be send!");
      const notification = new Notification(
        "Uusi viesti käyttäjältä: " + messageRow.nick,
        {
          body: messageRow.line,
        }
      );
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
      }
    });
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return { notify };
}
