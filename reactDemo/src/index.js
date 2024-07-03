import React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routers from "./router/index.js";
import "./index.css";
import Root from "./App.jsx";

const domNode = document.getElementById("root");

const root = createRoot(domNode);
const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: routers,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
