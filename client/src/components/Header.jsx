import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">

      {/* Logo and Title */}

      <div className="header-brand">
        <Link to="/">
          <img src={logo} alt="Lovely Loots Logo" className="header-logo" />
        </Link>
        <h1 className="header-title">Lovely Loots</h1>
      </div>

      {/* Navigation Component */}
      
      <nav>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;
