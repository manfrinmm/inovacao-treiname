import styled from "styled-components";

export const Container = styled.div`
  margin: 24px 0;

  header {
    a {
      display: flex;
      align-items: center;
      font-size: 1.6rem;

      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  h1 {
    text-align: center;
    font-size: 3.6rem;
    font-weight: 500;
    color: #325bbf;
  }

  input {
    width: 100%;

    border-radius: 8px;
    border: 1px solid;

    padding: 8px 16px;
    margin: 32px 0 16px;
  }

  button {
    background: #325bbf;
  }
`;

export const Content = styled.div`
  margin-top: 7.2rem;

  section {
    font-size: 3.2rem;
    text-align: center;

    p {
      margin-bottom: 3.2rem;
    }
  }
  div {
    margin-top: -24px;

    display: flex;

    a {
      padding: 8px;
      color: #5d89fc;
      border-radius: 8px;
      background: rgba(93, 137, 252, 0.2);
      transition: background 0.2s;

      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: auto;

      svg {
        margin-right: 8px;
      }

      &:hover {
        background: rgba(93, 137, 252, 0.5);
      }
    }
  }

  iframe {
    margin-top: 16px;

    width: 100%;
    height: 528px;

    border: 0;
  }
`;
