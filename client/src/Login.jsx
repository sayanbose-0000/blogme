import { useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';
import '../styles/register.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loggedIn, setLoggedIn] = useOutletContext();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BACK_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })

    response.ok ? toast.success(await response.json()) : toast.error(await response.json());
    response.ok ? setRedirect(true) : null;
  }

  if (redirect) {
    setLoggedIn(true)
    return <Navigate to={'/'} />
  }

  return (
    <div className='register__login register'>
      <form onSubmit={(e) => { handleLoginSubmit(e) }} className='register__form'>
        <h1 className='register__form--title'>Log In</h1>
        <input type="email" placeholder='Enter email...' autoComplete="email" required autoFocus value={email} onChange={(e) => { setEmail(e.target.value) }} className='register__form--input' />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required value={password} onChange={(e) => { setPassword(e.target.value) }} className='register__form--input' />
        <button type='submit' className='register__form--submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;