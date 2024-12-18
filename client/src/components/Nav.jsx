import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  if (Auth.loggedIn()) {
    return (
      <ul>
        <li>
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </li>
        <li>
          <a>
            <Link to="/profile">Profile</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/productsearch">Shop</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="/cart">Cart</Link>
          </a>
        </li>
      </ul>
    );
  }

  /* return (
    <header>
      <nav>{showNavigation()}</nav>
    </header>
  ); */
}

export default Nav;
