import styled from "styled-components";

interface CourseProps {
  isSelected: boolean;
}

export const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.26);
`;

export const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  background: #fff;
  padding: 16px 24px;
  box-shadow: 0 3px 4px 100vh rgba(0, 0, 0, 0.16);

  h1 {
    font-weight: 400;
    font-size: 2.4rem;
  }

  input {
    padding: 8px 16px;
    margin-top: 8px;
    border: 0;
    border-bottom: 1px solid;
  }

  ul {
    display: flex;
    flex-direction: column;

    margin-top: 24px;

    list-style: none;

    height: 250px;

    overflow-y: scroll;

    li + li {
      margin-top: 8px;
    }
  }

  footer {
    display: flex;
    justify-content: center;

    margin-top: 32px;

    button {
      /* margin: 32px auto 8px; */
      border-radius: 8px;

      font-size: 2.4rem;
      padding: 8px;

      background: rgba(93, 137, 252, 0.5);

      &:disabled {
        opacity: 0.5;
      }

      & + button {
        margin-left: 24px;
      }
    }
  }
`;

export const Course = styled.li<CourseProps>`
  padding: 8px 16px;
  border-radius: 8px;

  color: ${props => props.isSelected && "#EF5912"};
  border: 1px solid;
  background: #fff;

  button {
    color: ${props => props.isSelected && "#EF5912"};
    width: 100%;
    text-align: left;
    border: 0;
    background: transparent;
  }
`;
