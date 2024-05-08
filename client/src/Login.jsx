import { useState } from 'react';
import '../styles/register.scss';
import { Navigate } from 'react-router-dom';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

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
    return <Navigate to={'/'} />
  }

  return (
    <div className='signup register'>
      <form onSubmit={(e) => { handleLoginSubmit(e) }}>
        <h1>Log In</h1>
        <input type="email" placeholder='Enter email...' autoComplete="email" required autoFocus value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type='submit' className='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;