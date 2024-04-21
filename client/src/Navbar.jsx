import React from 'react';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
    <a href=""><img src='favicon.svg' alt='logo'></img></a>
    <a href="">blogme</a>
    <img src='user.svg' alt='user' className='user'></img>
    </div>
    )
  }
  
  export default Navbar;