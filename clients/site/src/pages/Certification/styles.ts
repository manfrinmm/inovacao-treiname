import styled from "styled-components";

export const Container = styled.div`
  max-width: 564px;
  margin: auto;
  padding: 180px 54px;

  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 3.6rem;
    color: #325bbf;
  }

  div {
    margin: 32px 0 16px;
  }

  input {
    width: 100%;

    border-radius: 8px;
    border: 1px solid;

    padding: 8px 16px;
  }

  button {
    background: #325bbf;
  }
`;
