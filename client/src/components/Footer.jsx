import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Branding */}

      <div className="footer-brand">
        <p>&copy; {new Date().getFullYear()} Lovely Loots. All rights reserved.</p>
      </div>

      {/* Quick Links */}

      <div className="footer-links">
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
