import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Nav";
import TitleHeader from "./TitleHeader";
//import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">

      {/* Logo and Title */}

      <TitleHeader />

      {/* Navigation Component */}
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
