import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '../styles/index.scss';
import Layout from './Layout';
import Home from './Home';
import ErrorPage from './ErrorPage';
import BlogPage from './BlogPage';
import Login from './Login';
import SignUp from './SignUp';
import CreatePost from './CreatePost';

// const BACK_URL = import.meta.env.VITE_API_BASE_URL;  // do this and add .env while using vercel, only works with vercel
const BACK_URL = 'http://localhost:3000' // and delete this

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
        path: "/blogpost",
        element: <BlogPage />
      },
      {
        path: "/create",
        element: <CreatePost />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
