import styled from "styled-components";

export const Container = styled.div`
  padding: 8px 16px;
  border: 1px solid;
  border-radius: 8px;

  background: #fff;

  section {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      opacity: 0.7;
      color: #325bbf;
    }

    input {
      border: 0;

      font-size: 2rem;
      color: #7888b6;

      &::placeholder {
        opacity: 0.4;
      }
    }
  }
`;
