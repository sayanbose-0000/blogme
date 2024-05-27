import '../styles/usermenu.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userAuthContext } from './UserContextProvider';
import { BACK_URL } from './main';
import { toast } from 'react-toastify';

const UserMenu = () => {
  const { userInfo, setUserInfo } = useContext(userAuthContext);

  const userName = userInfo?.userName;

  const handleLogOut = async () => {
    const response = await fetch(`${BACK_URL}/logout`, {
      credentials: 'include',
      method: 'POST'
    })

    setUserInfo(await response.json());
    response.ok ? toast.success("Logged Out") : toast.error("Error")
  }

  return (
    <div className='usermenu'>

      {userName ?
        <>
          <Link to="/create">Create</Link>
          <Link to="">{userName}</Link>
          <Link to="" onClick={handleLogOut}>logout</Link>
        </>
        :
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      }
    </div>
  );
};

export default UserMenu;