import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from 'react';
import '../styles/index.css';
import Layout from './Layout';
import Home from './Home';
import ErrorPage from './ErrorPage';
import BlogPage from './BlogPage';
import Login from './Login';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './UserContextProvider';

const BACK_URL = import.meta.env.VITE_API_BASE_URL;  // do this and add .env while using vercel, only works with vercel
// const BACK_URL = 'http://localhost:3000' // and delete this

export { BACK_URL };

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
        path: "/create",
        element: <CreatePost />
      },
      {
        path: "/post/:id",
        element: <BlogPage />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="dark" transition={Bounce} />
    </UserContextProvider>
  </React.StrictMode>
)
