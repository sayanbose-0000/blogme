import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import '../styles/register.css'

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loggedIn, setLoggedIn] = useOutletContext();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BACK_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
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
    <div className='register__signup register'>
      <form onSubmit={(e) => { handleSignUp(e) }} className='register__form'>
        <h1 className='register__form--title'>Sign Up</h1>
        <input type="text" placeholder='Enter username...' autoComplete="username" required autoFocus value={userName} onChange={(e) => { setUserName(e.target.value) }} className='register__form--input' />
        <input type="email" placeholder='Enter email...' autoComplete="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} className='register__form--input' />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required value={password} onChange={(e) => { setPassword(e.target.value) }} className='register__form--input' />
        <button type='submit' className='register__form--submit'>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;