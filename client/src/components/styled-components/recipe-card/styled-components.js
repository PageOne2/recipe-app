import styled, { css } from "styled-components";

export const RecipeCardWrapper = styled.div`
  width: 300px;
  display: block;
  margin: 15px 10px;
`

export const UserInfoWrapper = styled.div`
  position: relative;
  border-radius: 3px;
  border-bottom: 2px solid #0000001a;
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
`

export const UserImageWrapper = styled.div`
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;   
  }
`

export const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`

const UserNameStyle = css`
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
`

export const UserName = styled.h4`
  ${UserNameStyle}
  color: #797979;
`

export const UserNameMe = styled.h4`
  ${UserNameStyle}
  margin-right: 7px;
  color: #d14444; 
`

export const MoreUserActionsWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 15px;
  z-index: 1;
  background-color: #ffff;
  border: 1px solid #efefef;
  border-radius: 3px;
`

export const MoreActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 2px 10px;
  color:#2e2e2e;
  cursor: pointer;
  
  &:hover {
    background-color: #eeeeee;
  }
`

export const RecipeImageOverlay = styled.div`
  position: absolute;
  display: none;
  background-color: rgba(56, 56, 56, 0.658);
  width: 100%;
  height: calc(100% - 20px);
`

export const RecipeImageWrapper = styled.div`
  width: 100%;
  height: 230px;
  padding: 10px 0px;
  position: relative;
  cursor: pointer;
  
  &:hover ${RecipeImageOverlay} {
    display: block;
  }
`


export const GoToButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
  transform: translatey(-50%);
  padding: 10px 15px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
`

export const RecipeImage = styled.div`
  width: 100%;
  height: 100%;
  

  & img {
    border-radius: 3px;
    width: inherit;
    height: inherit;
  }
`

export const RecipeNameWrapper = styled.div`
  padding: 10px 0px;
` 

export const RecipeName = styled.h3`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`