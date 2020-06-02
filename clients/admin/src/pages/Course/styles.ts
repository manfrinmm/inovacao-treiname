import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    > section {
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
        input,
        textarea {
          height: 185px;
        }
      }

      & + section {
        margin-top: 24px;
      }
    }

    > div {
      /* width: 256px; */
    }
  }

  > button {
    margin: 64px 0 64px auto;
  }

  /* > div + button {
    align-self: flex-start;
    font-size: 2rem;
    margin-top: 24px;
    padding: 8px;
    background: rgba(4, 5, 34, 0.8);

    &:hover {
      background: rgba(4, 5, 34, 0.9);
    }

    svg {
      color: #9cbef6;
    }
  } */
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

export const Module = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  border-radius: 8px;

  padding: 8px 24px;

  background: rgba(93, 137, 252, 0.2);

  box-shadow: 0 4px 6px rgba(93, 137, 252, 0.2);

  section {
    display: flex;
    flex-direction: column;

    div + div {
      margin-top: 8px;
    }
  }

  section + div {
    margin: 0 32px;
  }

  div {
    width: 100%;
    textarea,
    input {
      height: 100%;
    }
  }
`;

export const Modules = styled.div`
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: 16px;
  }

  button {
    align-self: flex-end;
    margin-bottom: 8px;

    font-size: 2rem;
    margin-top: 24px;
    padding: 8px;
    background: rgba(4, 5, 34, 0.8);

    svg {
      color: #c53030;
    }
  }
`;
