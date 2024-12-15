import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Nav";
//import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">

      {/* Logo and Title */}

      <div className="header-brand">
        <Link to="/">
          {/* <img src={logo} alt="Lovely Loots Logo" className="header-logo" /> */}
        </Link>
        <Link to='/' className="header-brand-title">Lovely Loots</Link>
      </div>

      {/* Navigation Component */}
      
      <nav>
        <Navigation />
      </nav>
      <div className="header-btns">
        <a href="/signup">
          <button>Sign Up</button>
        </a>
        <a href="/login">
          <button>Login</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
