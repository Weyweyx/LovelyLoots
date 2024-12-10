import React from "react";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Branding */}

      <div className="footer-brand">
        <p>&copy; {new Date().getFullYear()} Lovely Loots. All rights reserved.</p>
      </div>

      {/* Quick Links */}

      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
