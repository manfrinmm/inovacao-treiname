import styled from "styled-components";

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.isErrored ? "#ed4337" : "#040522")};
  border-radius: 8px;

  background: #fff;

  section {
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      opacity: 0.7;
      color: #325bbf;
    }

    input {
      border: 0;

      font-size: 2rem;
      color: #7888b6;

      &::placeholder {
        opacity: 0.4;
      }
    }
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;
