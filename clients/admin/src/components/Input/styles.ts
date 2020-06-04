import styled from "styled-components";

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  input {
    margin-top: 4px;
    padding: 8px 16px;
    border: 1px solid ${props => props.isErrored && "#ed4337"};
    border-radius: 8px;

    &::placeholder {
      opacity: 0.6;
    }
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;
