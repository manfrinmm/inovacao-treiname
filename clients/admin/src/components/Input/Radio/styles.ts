import styled from "styled-components";

interface ContainerProps {
  isErrored: boolean;
  isMarked: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-right: 16px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${props => (props.isMarked ? "#EF5912" : " #325bbf")};
    font-size: 2rem;
    margin-bottom: 4px;

    input {
      height: 16px;
      width: 16px;
    }
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;
