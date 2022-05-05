import React from "react";

import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = () => {
  return (
    <div className="header">
      <div className="nav-bar">
        <Link to="/">
          <div className="logo">Dishes</div>
        </Link>
        <div className="options">
          <Link to="/login">
            <div className="log-in">Log In</div>
          </Link>
          <div className="sign-up">Sign-Up</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
