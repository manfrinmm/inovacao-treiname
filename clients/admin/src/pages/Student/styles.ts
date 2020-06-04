import styled, { css } from "styled-components";

interface StudentInfoProps {
  hasLink?: boolean;
}

export const Container = styled.div`
  > header {
    margin-top: 16px;

    button {
      display: flex;
      align-items: flex-end;

      font-size: 22px;
      background: transparent;

      svg {
        margin-right: 4px;
        width: 24px;
        height: 24px;
      }

      opacity: 0.6;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  > section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  > button {
    margin-left: auto;
    margin-top: 120px;
  }
`;

export const StudentInfo = styled.section<StudentInfoProps>`
  border-radius: 8px;
  margin-top: 40px;
  width: 448px;

  h1 {
    font-size: 32px;
    color: #325bbf;
    margin-bottom: 16px;
  }

  section {
    border: 1px solid;
    border-radius: 8px;
    padding: 8px 16px;
    background: #fff;

    p {
      strong {
        margin-left: 8px;
      }
    }
  }

  > div {
    margin-top: 56px;
    input {
      border: 0;
      box-shadow: 0 3px 6px rgba(16, 20, 81, 0.16);
      width: 100%;
    }
  }

  button {
    margin-top: 8px;
    padding: 8px;
    width: 100%;

    font-weight: 500;
    font-size: 1.6rem;
    color: #5d89fc;
    background: rgba(93, 137, 252, 0.2);

    ${props =>
      props.hasLink &&
      css`
        box-shadow: 0 3px 5px rgba(93, 137, 252, 0.5);
      `}

    svg {
      width: 24px;
      height: 28px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: auto;
    }

    &:hover {
      background: rgba(93, 137, 252, 0.2);

      ${props =>
        props.hasLink &&
        css`
          background: rgba(93, 137, 252, 0.3);
        `}
    }
  }
`;

export const Courses = styled.section`
  width: 640px;
  /* margin-top: 50px; */
  margin-left: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 24px;
    }

    button {
      background: rgba(4, 5, 34, 0.8);
      color: #f5f7fe;
      padding: 8px;

      svg {
        color: #9cbef6;
      }

      &:hover {
        background: rgba(4, 5, 34, 1);
      }
    }
  }

  section {
    > div {
      margin-top: 8px;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    h1 {
      font-size: 2rem;
      color: #7888b6;
      margin: 0 24px;
    }

    button {
      padding: 8px 16px;
    }
  }
`;
