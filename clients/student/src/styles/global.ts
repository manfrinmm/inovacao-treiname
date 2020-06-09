import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #f5f7fe;

  }

  html, body{
    height: 100%;
    overflow-y:auto;
  }

  #root{
    height: 100%;
  }

  body, button, input{
    font: 1.6rem "Roboto", sans-serif;
    color: #040522;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    border: 0;
  }

  a {
    color: #040522;
    text-decoration: none;
  }
`;
