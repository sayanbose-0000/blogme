import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from 'react';
import { useState } from "react";

const userAuthContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <userAuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userAuthContext.Provider>
  )
}

export default UserContextProvider;
export { userAuthContext };