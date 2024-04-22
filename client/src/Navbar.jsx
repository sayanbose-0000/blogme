import React, { useState } from 'react';
import UserMenu from './UserMenu';
import '../styles/navbar.scss';

const Navbar = () => {
  const [userMenu, setUserMenu] = useState(false);

  const handleUserMenu = (e) => {
    setUserMenu(!userMenu);
  }

  return (
    <div className='navbar'>
      <a href=""><img src='favicon.svg' alt='logo' height={100} width={100}></img></a>
      <a href="">blogme</a>
      <img src='person.jpg' alt='user' className='user' onClick={(e) => { handleUserMenu(e) }} height={100} width={100}></img>
      {userMenu && <UserMenu />}
    </div>
  )
}

export default Navbar;