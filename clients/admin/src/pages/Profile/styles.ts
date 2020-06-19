import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;

  /* justify-content: center; */
  margin-top: 88px;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;

    max-width: 300px;
    width: 100%;

    div + div {
      margin-top: 8px;
    }

    button {
      margin-top: 16px;
    }
  }
`;
