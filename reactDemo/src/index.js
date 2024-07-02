import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routers from "./router/index.js";
import Root from "./App.jsx";

const domNode = document.getElementById("root");

const root = createRoot(domNode);
const router = createBrowserRouter([
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
