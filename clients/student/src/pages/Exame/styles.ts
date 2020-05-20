import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 32px;

  > h1 {
    margin: 16px auto 24px;
    font-size: 2.4rem;
    text-align: center;
    color: #325bbf;
    max-width: 480px;
  }

  section {
    div + div {
      margin-top: 8px;
    }
  }

  > button {
    width: fit-content;
    margin: 24px 0 70px;
    margin-left: auto;
  }

  > p {
    text-align: center;
    line-height: 2.6rem;
  }
`;
