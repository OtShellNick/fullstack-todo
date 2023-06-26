import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import router from './Router/Router';

import { store } from '@store/mainStore';

import 'normalize.css';
import '@style/main.scss';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>,
    );
}