import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #313130;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 2px 2px #000;
`

export const NavBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;

  & a {
    text-decoration: none;
  }

  @media (max-width: 610px) {
    padding: 0 15px;
  }
`

export const Logo = styled.div`
  font-size: 25px;
  font-family: math;
  color: #fff;
  cursor: pointer;
`

export const Authenticate = styled.div`
  display: flex;
  align-items: center;
`

export const LogIn = styled.div`
  background-color: #fdfdfd;
  color: #000;
  margin-right: 15px;
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`

export const SignUp = styled.div`
  color: #fff;
  background-color: #ffb91a;
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #f5cd6f;
  }
`

export const GoToProfile = styled.div`
  display: flex;
  align-items: center;
`

export const GoToProfileButtonWrapper = styled.div`
  padding-right: 20px;
`

export const GoToProfileButton = styled.div`
  color: #fff;
  background-color: #f95b5b;
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #ff3939;
  }
` 

export const LogOutButtonWrapper = styled.div`
  display: block;
`

export const LogOutButton = styled.button`
  color: #000;
  background-color: #fff;
  padding: 5px 7px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`