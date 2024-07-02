import { lazy } from "react";

const reRender = lazy(() => import("../views/reRender.jsx"));

const ReRenderRouter = [
  {
    path: "/reRenderUI",
    element: reRender,
  },
];

const routers = [...ReRenderRouter];

export default routers;
