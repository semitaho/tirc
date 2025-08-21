import { useEffect, useState } from "react";

const useUi = () => {
  const em = (text) => {
    if (!text) {
      return;
    }
    return text
      .replace(/:\)/g, "🙂")
      .replace(/=\)/g, "🙂")

      .replace(/:\(/g, "🙁")
      .replace(/=\(/g, "🙁")

      .replace(/:D/g, "😃")
      .replace(/;\)/g, "😉")

      .replace(/=D/g, "😃");
  };
  const t = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return { t, em, useWindowFocus };
};

export const useWindowFocus = () => {
  const [focused, setFocused] = useState(false);
  const [focusChanged, setFocusChanged] = useState(false);
  useEffect(() => {
    const handleFocus = () => {
      console.log("focused!");
      setFocused(true);
      setFocusChanged(true);
    };

    const handleBlur = () => {
      console.log("blurred!");
      setFocused(false);
      setFocusChanged(true);
    };
    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

  }, [focused]);

  return { focused, focusChanged };
};

export default useUi;
