import styled, { keyframes } from "styled-components";

const spin  = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const SpinnerRotate = styled.div`
  border: 15px solid rgb(212, 212, 212);
  border-radius: 50%;
  border-top: 15px solid #313130;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`
