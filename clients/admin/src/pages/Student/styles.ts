import styled, { css } from "styled-components";

interface StudentInfoProps {
  hasLink?: boolean;
}

export const Container = styled.div`
  > header {
    margin: 16px 0 24px;

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
  margin-top: 8px;
  width: 448px;

  h1 {
    font-size: 3.2rem;
    color: #325bbf;
    margin-bottom: 16px;
  }

  section {
    border: 1px solid;
    border-radius: 8px;
    padding: 8px 16px;
    background: #fff;
  }

  form {
    > div {
      margin-top: 56px;

      input {
        border: 0;
        box-shadow: 0 3px 6px rgba(16, 20, 81, 0.16);
        width: 100%;
      }
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

export const ExamListContainer = styled.div`
  padding: 8px 0;
  margin-top: 16px;

  h3 {
    margin-bottom: 16px;
    color: #325bbf;
  }

  ul {
    overflow-y: scroll;
    max-height: 250px;

    li {
      display: flex;
      flex-direction: column;

      text-align: center;

      border: 1px solid;
      border-radius: 8px;
      padding: 8px 16px;
      background: #fff;

      & + li {
        margin-top: 8px;
      }

      div {
        display: flex;
        justify-content: space-around;

        margin-top: 8px;

        a {
          background: rgba(93, 137, 252, 0.2);
          border-radius: 8px;

          padding: 8px;

          color: #5d89fc;
        }

        button {
          background: rgba(93, 137, 252, 0.2);
          border-radius: 8px;
          padding: 8px;

          color: #5d89fc;
          margin-top: 0;
          margin-left: 32px;
        }
      }
    }
  }
`;

export const Courses = styled.section`
  width: 640px;
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

export const CourseList = styled.ul`
  margin-top: 16px;

  list-style: none;

  max-height: 320px;

  overflow-y: scroll;

  li + li {
    margin-top: 8px;
  }
`;

export const Course = styled.li`
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

export const Logs = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 3.2rem;
    color: #325bbf;
    margin: 64px 0 32px;
  }

  section {
    max-height: 320px;
    overflow-y: scroll;
  }

  table {
    max-width: 688px;
    text-align: center;
    margin: 0 auto 32px;

    border-collapse: separate;
    border-spacing: 0 8px;

    thead td {
      position: sticky;
      top: 0;
    }

    tbody {
      td {
        border: 0;
        border-style: solid none;
        padding: 16px;
        background: #fff;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-bottom-right-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
    }
  }
`;
