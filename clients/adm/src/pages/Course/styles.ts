import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    section {
      display: flex;
      flex-direction: row;

      div {
        flex: 1;
      }

      div + div {
        margin-left: 32px;
      }

      :nth-child(1) {
        div {
          &:nth-child(n + 4) {
            width: 50px;
          }
        }
      }

      :nth-child(2) {
        input {
          height: 185px;
        }
      }

      & + section {
        margin-top: 24px;
      }
    }

    > div {
      width: 256px;
    }
  }

  > button {
    margin: 64px 0 64px auto;
  }
`;

export const Title = styled.section`
  font-size: 3.2rem;
  color: #325bbf;
  margin: 40px 0 16px;

  &:first-child {
    font-weight: 500;
    margin: 48px 0 24px;
  }
`;

export const StudentLearnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 24px;

  button {
    align-self: self-end;
    padding: 0;
    width: 48px;
    height: 48px;

    svg {
      margin: 0;
    }
  }
`;

export const StudentLearnContent = styled.div`
  display: flex;

  button {
    align-self: flex-end;

    background: transparent;
    color: #c53200;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#c53200")};
    }
  }
`;
