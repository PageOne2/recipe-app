import styled from "styled-components";

export const HomePageButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px 165px;
  @media (max-width: 945px) {
    flex-direction: column-reverse;
    align-items: center;
    margin: 50px 0;
  }
`

export const ShareRecipeButtonWrapper = styled.div`
  & button {
    border: none;
    border-radius: 5px;
    padding: 7px 20px;
    font-size: 20px;
    background-color: #1f201f;
    color: #fff;
    cursor: pointer;
  }
`