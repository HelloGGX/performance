import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

const domNode = document.getElementById("root");

const root = createRoot(domNode);
root.render(<App />);
