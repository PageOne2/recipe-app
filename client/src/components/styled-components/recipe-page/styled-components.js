import styled from "styled-components";

export const RecipePageWrapper = styled.div`
  height: 100vh;
`

export const RecipePageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const RecipePageName = styled.div`
  margin: 50px auto;
`

export const RecipeInfo = styled.div`
  display: flex;
`

export const RecipePageInfo = styled.div`
  margin: 0 10px 30px 0;
`

export const RecipePageImage = styled.div`
  margin-bottom: 25px;

  & img {
    height: 250px;
  }
`

export const RecipeListWrapper = styled.div`
  display: block;
`

export const FieldTitle = styled.h4`
  font-size: 20px;
  margin-bottom: 10px;
`

export const OlMethodList = styled.ol`
  margin-bottom: 25px;

  & li {
    font-size: 18px;
    padding: 5px 0;
    
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
  }
`
