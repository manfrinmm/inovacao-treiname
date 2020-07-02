import styled from "styled-components";

export const Container = styled.div`
  margin: auto 32px;

  header {
    display: flex;
    flex-direction: column;

    margin-top: 56px;

    h3 {
      font-size: 3.6rem;
      color: #325bbf;
      margin-bottom: 16px;

      p {
        display: inline-block;
        color: #ef5912;
      }
    }
  }

  main {
    padding: 32px;

    /* background: rgba(0, 0, 0, 0.3); */
    background: rgba(120, 136, 182, 0.5);
    /* background: rgba(19, 226, 123, 0.4); */
    background: #9cbef6;
    border-radius: 8px;
  }
`;

export const MessageSuccess = styled.section`
  div {
    text-align: center;
    color: #101451;

    p {
      font-size: 2rem;
      line-height: 3rem;
    }

    svg {
      color: #13e27b;

      margin: 24px 0;

      width: 80px;
      height: 80px;
    }
  }
`;

export const Buttons = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: flex;
    align-items: center;

    font-size: 2rem;

    color: #fff;

    &:hover {
      text-decoration: underline;
    }

    &:last-child {
      color: #ef5912;

      svg {
        margin-right: 4px;
      }
    }

    & + a {
      margin-top: 16px;
    }
  }
`;
