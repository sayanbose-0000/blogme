import { useState } from 'react';
import '../styles/register.scss';

const Login = () => {
  return (
    <div className='signup register'>
      <form>
        <h1>LogIn</h1>
        <input type="email" placeholder='Enter email...' autoComplete="email" required />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required />
        <button type='submit' className='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;