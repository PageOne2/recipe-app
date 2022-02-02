import React from "react";

import "./header.styles.css";

const Header = () => {
  return (
    <div className="header">
      <div className="nav-bar">
        <div className="logo">Dishes</div>
        <div className="options">
          <div className="log-in">Log In</div>
          <div className="sign-up">Sign-Up</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
