import Auth from '../utils/auth';
import { Link } from 'react-router-dom';


function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      const listStyle = {
        display: 'inline-block',
        marginRight: '10px', // optional, adds space between list items
      };
      return (
        <ul>
          <li>
            <a href='/' onClick={() => Auth.logout()} style={listStyle}>
              Logout
            </a>
          </li>
          <li>
            <Link to='/profile' style={listStyle}>Profile</Link>
          </li>
          <li>
            <Link to='/productseach' style={listStyle}>Shop</Link>
          </li>
        </ul>
      );
    } 
  }

  return (
    <header>
      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
