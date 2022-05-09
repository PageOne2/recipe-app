import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


import "./header.styles.css";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = useSelector((state) => state.user.userData);

  return (
    <div className="header">
      <div className="nav-bar">
        <Link to="/">
          <div className="logo">Dishes</div>
        </Link>
        <div>
          {!isLoggedIn ?
          <div className="authenticate">
            <Link to="/login">
              <div className="log-in">Log In</div>
            </Link>
            <div className="sign-up">Sign-Up</div>
          </div>
          : <div className="user">{`Welcome ${userName.name.split(' ')[0]}!`}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
