import { lazy } from "react";

const ReRender = lazy(() => import("../views/reRender.jsx"));

const ReRenderRouter = [
  {
    path: "/reRenderUI",
    element: <ReRender />,
  },
];

const routers = [...ReRenderRouter];

export default routers;
