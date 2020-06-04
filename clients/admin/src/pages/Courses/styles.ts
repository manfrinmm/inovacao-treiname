import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  form {
    width: 528px;
    margin: 80px auto 40px;
  }
`;

export const CourseList = styled.ul`
  list-style: none;
`;

export const CourseItem = styled.li`
  display: flex;
  align-items: center;

  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid;
  background: #fff;

  & + li {
    margin-top: 8px;
  }

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
