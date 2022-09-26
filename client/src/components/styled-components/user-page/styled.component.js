import styled, { keyframes } from "styled-components";

export const UserPageWrapper = styled.div`
  margin: 40px;
`

export const UserProfilePicWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-right: 40px;
`

export const UserName = styled.p`
  color: #363636;
  font-size: 20px;
`

export const TabWrapper = styled.div`
  margin: 40px 0px;
  @media (max-width: 415px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`

export const Tab = styled.span`
  color: #fff;
  margin: 10px;
  padding: 10px 20px;
  background-color: #82d173;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${({op}) => op};

  &:hover {
    opacity: 1;
  }
`

export const RecipesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const spin  = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const EmptyResponseWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;

  & p {
    font-size: 22px;
    color: #4a4a4a;
  }
`

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-60%, -50%);
`

export const SpinnerRotate = styled.div`
  border: 15px solid rgb(212, 212, 212);
  border-radius: 50%;
  border-top: 15px solid #313130;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`