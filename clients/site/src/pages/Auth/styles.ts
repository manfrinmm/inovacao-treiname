import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  padding: 16px;

  h1 {
    color: #325bbf;
    font-weight: 400;
    font-size: 5.4rem;
  }

  form {
    margin-top: 16px;
    max-width: 320px;

    div + div {
      margin-top: 8px;
    }

    button {
      margin-top: 24px;

      font-size: 2.4rem;
    }
  }
`;
