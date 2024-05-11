import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import '../styles/navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userAuthContext } from './UserContextProvider';

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation(); // detects route change
  const { userInfo, setUserInfo } = useContext(userAuthContext);

  useEffect(() => {
    fetch(`${BACK_URL}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      res.json().then((data) => {
        if (res.ok) setUserInfo(data);
        else setUserInfo(data);
      })
    }).catch(err => {
      setUserInfo(data);
      // console.log(userInfo);
    })
  }, [loggedIn])

  useEffect(() => {
    setUserMenu(false);
  }, [location])

  const handleUserMenu = (e) => {
    setUserMenu(!userMenu);
  }


  return (
    <div className='navbar'>
      <Link to="/"><img src='favicon.svg' alt='logo' height={100} width={100}></img></Link>
      <Link to="/">blogme</Link>
      <img src='hamburger.svg' alt='user' className='user' onClick={(e) => { handleUserMenu(e) }} height={100} width={100}></img>
      {userMenu && <UserMenu />}
    </div>
  )
}

export default Navbar;