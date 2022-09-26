import styled, { css } from "styled-components";

export const RecipePageWrapper = styled.div`
  height: 100vh;

  @media (max-width: 720px) {
    overflow-x: hidden;
  }
`

export const RecipePageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const RecipePageName = styled.div`
  margin: 50px auto;
  color: #464646;
  width: 530px;
  word-break: break-word;

  @media (max-width: 720px) {
    width: unset;
    padding: 0 15px;
  }
`

export const RecipeInfo = styled.div`
  display: flex;
`

export const RecipePageInfo = styled.div`
`

export const RecipePageImage = styled.div`
  display: flex;  
  @media (max-width: 720px) {
    flex-direction: column-reverse;
  }
`

export const RecipeImageWrapper = styled.div`
  & img {
    width: 400px;
    height: 300px;
  }

  @media (max-width: 720px) {
    & img {
      width: 100%;
    }
  }
`

export const UserPicAndInitialInfoWrapper = styled.div`
  margin-left: 10px;

  @media (max-width: 720px) {
    display: flex;
  }
`

export const UserPicWrapper = styled.div`
  margin-bottom: 10px;
  & img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }

  @media (max-width: 720px) {
    margin-right: 20px;
  }
`

export const LikesAndPrepTimeWrapper = styled.div`
  @media (max-width: 720px) {
    display: flex;
  }
`

const LikesAndPrepInfoWrapperStyles = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 1px 10px;

  & p {
    padding-left: 10px;
    color: #464646;
  }
`

export const LikesInfoWrapper = styled.div`
  ${LikesAndPrepInfoWrapperStyles}
  background-color: ${({bgColor}) => bgColor};
  border-left: 3px solid ${({borderColor}) => borderColor};
`

export const PrepTimeWrapper = styled.div`
  ${LikesAndPrepInfoWrapperStyles}
  background-color: ${({bgColor}) => bgColor};
  border-left: 3px solid ${({borderColor}) => borderColor};
`

export const RecipeFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const TabWrapper = styled.div`
  display: flex;
  @media (max-width: 720px) {
    margin-left: 10px;
  }
`

export const RecipeListWrapper = styled.div`
  display: block;
  padding: 15px 0px 10px 20px;
  width: 400px;

  @media (max-width: 720px) {
    width: unset;
    margin-left: 10px;
    padding: 15px 5px 10px 20px;
  }
`

export const RecipeFieldNameAndIconWrapper = styled.div`
  display: flex;
  padding: 10px 10px 0 5px;
  margin: 10px 15px 0 0;
  background-color: ${({bgColor}) => bgColor};
  border-left: 3px solid ${({borderColor}) => borderColor};
  color: #464646;
  cursor: pointer;
`

export const FieldTitle = styled.h4`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const OlMethodList = styled.ol`
  margin-bottom: 25px;

  & li {
    font-size: 18px;
    padding: 5px 0;
    word-break: break-word;
    
    &::marker {
      font-size: 15px;
      font-weight: bold;
      color: rgb(255, 115, 0);
    }
  }
`

export const UlIngredientList = styled.ul`
  & li {
    font-size: 18px;
    padding: 5px 0;
    word-break: break-word;
  }
`
