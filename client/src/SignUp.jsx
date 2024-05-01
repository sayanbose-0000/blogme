import { useState } from 'react';
import '../styles/register.scss';
import { BACK_URL } from './main';

const SignUp = () => {
  const [fileView, setFileView] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    fetch(`${BACK_URL}`, )
  }

  return (
    <div className='signup register'>
      <form onSubmit={(e) => { handleSignUp(e) }}>
        <h1>Sign Up</h1>
        <input type="text" placeholder='Enter username...' autoComplete="username" required autoFocus/>
        <input type="email" placeholder='Enter email...' autoComplete="email" required />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required />
        <button type='submit' className='submit'>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;