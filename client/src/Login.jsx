import { useState } from 'react';
import '../styles/register.scss';

const Login = () => {
  return (
    <div className='signup register'>
      <form>
        <h1>Log In</h1>
        <input type="email" placeholder='Enter email...' autoComplete="email" required autoFocus/>
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required />
        <button type='submit' className='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;