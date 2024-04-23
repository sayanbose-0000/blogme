import { useState } from 'react';
import '../styles/register.scss';

const SignUp = () => {
  const [fileView, setFileView] = useState(null);

  const handleFileView = (e) => {
    const img = e.target.files[0];

    if (img) {
      var reader = new FileReader();

      reader.onload = function () {
        setFileView(reader.result);
      }

      reader.readAsDataURL(img);
    }
  }

  const handleClickImageHolder = () => {
    document.getElementById("fileselect").click();
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fileView) {
      alert("Choose an image!!");
      return;
    }

  }

  return (
    <div className='signup register'>
      <form onSubmit={(e) => { handleSignUp(e) }}>
        <h1>SignUp</h1>
        <input type="file" id="fileselect" accept="image/*" onChange={e => { handleFileView(e) }} />
        <img className="imageholder" onClick={handleClickImageHolder} src={fileView ? `${fileView}` : 'user.svg'} height={100} width={100}></img>
        <input type="text" placeholder='Enter username...' autoComplete="username" required />
        <input type="email" placeholder='Enter email...' autoComplete="email" required />
        <input type="password" placeholder='Enter password...' autoComplete="new-password" required />
        <button type='submit' className='submit'>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;