import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userReducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { 
  HeaderWrapper, 
  NavBar, 
  Logo,
  Authenticate,
  LogIn,
  SignUp,
  GoToProfile,
  GoToProfileButtonWrapper,
  GoToProfileButton,
  LogOutButtonWrapper,
  LogOutButton
} from "../styled-components/header/styled-components";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userName = useSelector(state => state.user.userData);
  const navigate = useNavigate();

  const handleClick = () => {
    Cookie.remove('jwt');
    dispatch(logOut());
    navigate('/');
  }

  return (
    <HeaderWrapper>
      <NavBar>
        <Link to="/">
          <Logo>Dishes</Logo>
        </Link>
        {!isLoggedIn 
        ? <Authenticate>
            <Link to="/login">
              <LogIn>Log In</LogIn>
            </Link>
            <Link to="/signup">
              <SignUp>Sign-Up</SignUp>
            </Link>
          </Authenticate>
        : <GoToProfile>
            <GoToProfileButtonWrapper>
              <Link to="/myprofile">
                <GoToProfileButton>My Profile &rarr;</GoToProfileButton>
              </Link>
            </GoToProfileButtonWrapper>
            <LogOutButtonWrapper>
              <LogOutButton onClick={handleClick}>Log Out</LogOutButton>
            </LogOutButtonWrapper>
          </GoToProfile>
        }
      </NavBar>
    </HeaderWrapper>
  );
};

export default Header;
