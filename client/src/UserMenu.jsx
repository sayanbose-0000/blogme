import '../styles/usermenu.scss';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className='usermenu'>
      <Link to="/create">Create</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default UserMenu;