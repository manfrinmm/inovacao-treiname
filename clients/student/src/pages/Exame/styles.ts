import styled from "styled-components";

export const Container = styled.div`
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
`;
