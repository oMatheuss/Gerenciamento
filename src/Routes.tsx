import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Error from './components/Error'
import Home from './components/Home';
import { Api } from './services/Api';
import Activities from './components/Activities';
import SignUp from './components/SignUp';

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <Error />
    },
    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Error />
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />,
                loader: Api.getUser
            },
            {
                path: "/activities",
                element: <Activities />,
                loader: Api.getActivities
            },
        ]
    }
]);