import styled from "styled-components";

export const Container = styled.header`
  background: #101451;

  height: 96px;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  color: #f5f7fe;
  padding: 16px 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 64px;
  }

  section {
    display: flex;
    align-items: center;

    div {
      a {
        color: #f5f7fe;

        :hover {
          text-decoration: underline;
        }
      }

      p {
        margin-bottom: 8px;
      }

      span {
        opacity: 0.5;
      }
    }

    button {
      width: 100px;
      height: 48px;

      font-size: 2.4rem;
      background: #f0f2f5;
      color: #101451;
      margin-left: 64px;

      padding: 0;
    }
  }
`;
