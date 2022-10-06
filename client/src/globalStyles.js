import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
  }

  form {
    border: none;
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {  
    opacity: 1;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #7a7a79; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #313131; 
  }     
` 

export default GlobalStyle;