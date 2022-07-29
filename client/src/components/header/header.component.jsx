import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userReducer/userReducer";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import "./header.styles.css";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userName = useSelector(state => state.user.userData);

  const handleClick = () => {
    Cookie.remove('jwt');
    dispatch(logOut());
  }

  return (
    <div className="header">
      <div className="nav-bar">
        <Link to="/">
          <div className="logo">Dishes</div>
        </Link>
        <div className="user-log">
          {!isLoggedIn ?
          <div className="authenticate">
            <Link to="/login">
              <div className="log-in">Log In</div>
            </Link>
            <Link to="/signup">
              <div className="sign-up">Sign-Up</div>
            </Link>
          </div>
          : <div className="profile">
              <div className="user"><Link to="/myprofile"><div className="my-profile">My Profile &rarr;</div></Link></div>
              <div className="log-out"><button className="log-out-btn" onClick={handleClick}>Log Out</button></div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
