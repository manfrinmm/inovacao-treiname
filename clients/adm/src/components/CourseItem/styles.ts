import styled from "styled-components";

export const Container = styled.div`
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid;
  background: #fff;

  display: flex;
  align-items: center;

  div {
    p {
      margin-bottom: 16px;
      font-weight: 500;
    }

    section {
      span {
        color: #7888b6;

        & + span {
          margin-left: 16px;
        }
      }
    }
  }

  a {
    margin-left: auto;
    svg {
      padding: 0;
    }
  }
`;
