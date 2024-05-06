import { useState } from 'react';
import '../styles/register.scss';
import { BACK_URL } from './main';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    
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