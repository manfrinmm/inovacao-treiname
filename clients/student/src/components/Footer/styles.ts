import styled from "styled-components";

export const Container = styled.footer``;

export const Content = styled.div`
  margin: 88px auto 0;
  max-width: 1120px;
  padding: 16px 32px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #325bbf;
    margin-bottom: 8px;
  }

  section {
    display: flex;

    svg {
      color: #13e27b;
      margin-left: 4px;
    }

    p + p {
      margin-top: 8px;
    }
  }
`;
