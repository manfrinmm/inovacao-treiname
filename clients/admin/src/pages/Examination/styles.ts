import styled from "styled-components";

import Button from "~/components/Button";

interface AnswerProp {
  isMarked?: boolean;
}

export const Container = styled.div`
  margin-bottom: 48px;

  header {
    margin: 48px 0 16px;

    h1 {
      font-size: 3.2rem;
      color: #325bbf;
    }

    div {
      width: 30%;
    }

    h3 {
      margin-top: 16px;
      font-size: 3.2rem;
      font-weight: 400;
      color: #325bbf;
    }
  }

  form {
    > button {
      margin-left: auto;
    }
  }
`;

export const Title = styled.div`
  label {
    font-weight: 500;
  }

  textarea {
    height: 120px;
  }
`;

export const Questions = styled.ul`
  max-width: 736px;
  margin: 8px auto 56px;
  list-style: none;

  display: flex;
  flex-direction: column;
`;

export const RemoveQuestionButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 8px;

  font-size: 2rem;
  margin-top: 24px;
  padding: 8px;
  background: rgba(4, 5, 34, 0.8);

  svg {
    color: #c53030;
  }
`;

export const Question = styled.li`
  background: rgba(93, 137, 252, 0.2);
  padding: 8px 24px 16px;
  border-radius: 8px;

  hr {
    margin: 16px 0;
    height: 1px;
    border: 0;
    background: #9cbef6;
  }
`;

export const Answer = styled.div<AnswerProp>`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;

    textarea {
      /* border-color: ${props => props.isMarked && "#EF5912"}; */
    }
  }

  /* section {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-right: 16px;

    h2 {
      color: ${props => (props.isMarked ? "#EF5912" : " #325bbf")};
      font-size: 2rem;
      margin-bottom: 4px;
    }

    input {
      height: 16px;
      width: 16px;
    }
  } */
`;

export const AddQuestionButton = styled(Button)`
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
`;
