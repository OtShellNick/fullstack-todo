import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Main from "@components/Main/Main";
import Auth from "@components/Auth/Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/auth',
        element: <Auth />
    }
]);

export default router;