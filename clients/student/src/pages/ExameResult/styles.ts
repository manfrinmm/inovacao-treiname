import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 32px;

  header {
    display: flex;
    flex-direction: column;
    margin: 16px 0;

    a {
      display: flex;
      align-items: center;
      align-self: flex-start;

      &:hover {
        text-decoration: underline;
      }
    }

    h1 {
      margin: 0 auto 24px;
      font-size: 2.4rem;
      text-align: center;
      color: #325bbf;
      max-width: 480px;
    }

    div {
      display: flex;
      justify-content: space-between;
    }
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
