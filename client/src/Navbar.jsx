import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import '../styles/navbar.scss';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(false);
  const location = useLocation(); // detects route change

  const handleUserMenu = (e) => {
    setUserMenu(!userMenu);
  }

  useEffect(() => {
    setUserMenu(false);
  }, [location])

  return (
    <div className='navbar'>
      <Link to="/"><img src='favicon.svg' alt='logo' height={100} width={100}></img></Link>
      <Link to="/">blogme</Link>
      <img src='user.svg' alt='user' className='user' onClick={(e) => { handleUserMenu(e) }} height={100} width={100}></img>
      {userMenu && <UserMenu />}
    </div>
  )
}

export default Navbar;