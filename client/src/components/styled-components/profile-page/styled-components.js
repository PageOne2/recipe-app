import styled from "styled-components";

export const ProfileWrapper = styled.div`
  margin: 40px;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-right: 40px;
`

export const ChageProfilePicWrapper = styled.div``

export const ChangeProfilePicInputWrapper = styled.div`
  margin-top: 20px;

  & label {
    padding: 10px;
    background-color: #363333;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  & input {
    display: none;
    visibility: hidden;
  }
`

export const TabWrapper = styled.div`
  margin: 40px 0px;
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

export const UpdatePassWordFormWrapper = styled.div`
  display: flex;
  justify-content: center;
`