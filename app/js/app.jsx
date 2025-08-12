import config from "./services/ConfigService.js";
import React from "react";
import Tirc from "./components/tirc.jsx";
import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
let tircContent = document.getElementById("tirc_content");

//config.loadPhrases().then(phraseObjects => {
let phraseNames = ["Inex antoinette"];
let index = 0; //Math.floor(Math.random() * phraseNames.length);
createRoot(tircContent).render(
  <StrictMode>
    <Tirc phraseindex={index} phrases={phraseNames}></Tirc>
  </StrictMode>,
);

