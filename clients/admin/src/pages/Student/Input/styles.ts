import styled, { css } from "styled-components";

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: flex;
    align-items: center;

    input {
      width: 100%;

      padding: 4px;
      border: 0;
      border-radius: 8px;

      ${props =>
        props.isErrored &&
        css`
          border-bottom: 1px solid #ed4337;
        `}

      &::placeholder {
        opacity: 0.6;
      }
    }
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;
