import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.js';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.css';

const domNode = document.getElementById('root');

const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
