import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
` 

export const FormWrapper = styled.div`
  padding: 0 25px;

  & form {
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
  } 
` 

export const FormTitle = styled.div`
  font-size: 15px;
  margin-bottom: 15px;

  & h2 {
    font-weight: 100;
  }
`

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 25px 5px;
  border: 1px solid #9b9b9b;
  border-radius: 5px;
  background-color: #f7f7f7;
  width: 350px;
  height: 30px;
`

export const InputErrorMessage = styled.div`
  color: #ff0000;
  font-size: 15px;
  padding-bottom: 5px;
`

export const FormMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const Message =  styled.div`
  font-size: 15px;
`

export const SubmitButton = styled.button`
  margin-top: 20px;  
  padding: 10px 0px;
  font-size: 18px;
  color: #fff;
  background-color: #f78154;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`