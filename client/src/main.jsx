import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.scss';
import Layout from './Layout';
import Home from './Home';
import ErrorPage from './ErrorPage';
import BlogPage from './BlogPage';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/blogpost",
        element: <BlogPage />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
