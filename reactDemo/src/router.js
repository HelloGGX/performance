import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

const ReRender = lazy(() => import('./features/reRender/reRender.jsx'));
const Layout = lazy(() => import('./components/Layout.jsx'));

const ReRenderRouter = [
  {
    path: '/reRenderUI',
    element: <ReRender />,
  },
];
const routers = [...ReRenderRouter];

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: routers,
  },
]);

export default router;
