import styled, { keyframes} from "styled-components";

const spin  = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

export const LoadMoreButton = styled.button`
  width: 120px;
  height: 40px;
  cursor: pointer;
  border: none;
  font-size: 20px;
  border-radius: 3px;
  background-color: #ff6347;
  color: #ffffff;

  &:hover {
    background-color: #fa745c;
  }
`

export const MoreButtonSpinner = styled.div`
  margin: 0 auto;
  border: 5px solid #fdd5d5;
  border-radius: 50%;
  border-top: 5px solid #ff3131;
  width: 25px;
  height: 25px;
  animation: ${spin} 2s linear infinite;
`