import { useState } from 'react';
import '../styles/register.scss';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

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

  // useEffect(() => {
  //   if (redirect) {
  //     setLoggedIn(true);
  //     <Navigate to={'/'} />
  //   }
  // }, [redirect]);

  if (redirect) {
    setLoggedIn(true)
    return <Navigate to={'/'} />
  }


  return (
    <div className='signup register'>
      <form onSubmit={(e) => { handleSignUp(e) }}>
        <h1>Sign Up</h1>
        <input type="text" placeholder='Enter username...' autoComplete="username" required autoFocus value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        <input type="email" placeholder='Enter email...' autoComplete="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type='submit' className='submit'>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;