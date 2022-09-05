import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
`

export const Button = styled.button`
  margin-right: 20px;
  padding: 7px 20px;
  background-color: rgb(255, 165, 0);
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  opacity: ${({opacity}) => opacity};

  &:hover {
    background-color: rgb(255, 165, 0);
    opacity: 1;
  } 
`