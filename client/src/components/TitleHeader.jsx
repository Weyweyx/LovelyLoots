import React from "react";
import { Link } from "react-router-dom";
//import logo from "../assets/images/logo.png";

// eslint-disable-next-line react/prop-types
const TitleHeader = ({ to = "/" }) => {
  return (
    <header className="header">
      {/* Logo and Title */}

      <div className="header-brand">
        <Link to="/">
          {/* <img src={logo} alt="Lovely Loots Logo" className="header-logo" /> */}
        </Link>
        <Link to={to} className="header-brand-title">
          Lovely Loots
        </Link>
      </div>
    </header>
  );
};

export default TitleHeader;
