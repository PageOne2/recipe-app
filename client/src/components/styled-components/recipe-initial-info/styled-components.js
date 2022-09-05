import styled, { css } from "styled-components";

export const RecipeInitialInfoWrapper = styled.div`
  margin: 3px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  background-color: #ffb91a;
  border-radius: 3px;
` 

const LikesAndTimeWrapperStyles = css`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  color: rgb(255, 255, 255);
`

export const LikesWrapper = styled.div`
  ${LikesAndTimeWrapperStyles}
`
export const TimeWrapper = styled.div`
  ${LikesAndTimeWrapperStyles}
`

export const NumberOfLikes = styled.span`
  padding-left: 3px;
`

export const Minutes = styled.span`
  padding-left: 5px;
  font-size: 16px;
`


