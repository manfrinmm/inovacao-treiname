import styled, { css } from "styled-components";

interface ContainerProps {
  checked?: boolean;
}

interface OptionProps {
  checked: boolean;
  correct_answer: boolean;
  answer_mark: boolean;
}

interface ContentProps {
  checked?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 8px;

  border: 1px solid ${props => (props.checked ? "#4bb543" : "#ff0000")};

  h1 {
    padding: 8px 16px;

    background: transparent;
    width: 100%;

    display: flex;
    align-items: center;
  }

  > div {
    p {
      padding: 8px 24px;
      border-top: 1px solid ${props => (props.checked ? "#4bb543" : "#ff0000")};
      border-bottom: 1px solid
        ${props => (props.checked ? "#4bb543" : "#ff0000")};
    }

    section {
      padding: 8px 24px;

      & + div {
        margin-top: 80px;
      }
    }
  }
`;

export const Content = styled.div<ContentProps>`
  /* border: 1px solid ${props => (props.checked ? "#4bb543" : "#ff0000")}; */
`;

export const Option = styled.div<OptionProps>`
  display: flex;

  div {
    margin-right: 8px;

    border-radius: 4px;
    padding: 4px;
    flex: 1;

    ${props => {
      if (props.checked && props.answer_mark) {
        return css`
          background: #4bb543;
          background: #5eeb9c;
          background: rgba(94, 235, 156, 0.5);
          /* background: rgba(75, 181, 67, 0.4); */
          label {
            color: #4bb543;
            font-weight: 500;
          }
        `;
      }

      if (props.correct_answer) {
        return css`
          /* background: #4bb543; */
          /* background: #5eeb9c; */
          /* background: rgba(94, 235, 156, 0.5); */
          /* background: rgba(75, 181, 67, 0.4); */
          label {
            color: #4bb543;
          }
        `;
      }

      if (props.answer_mark) {
        return css`
          /* background: #4bb543; */
          /* background: #5eeb9c; */
          /* background: rgba(94, 235, 156, 0.5); */
          /* background: rgba(75, 181, 67, 0.4); */
          label {
            color: red;
          }
        `;
      }
    }}
  }
`;
