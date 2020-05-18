import styled, { css } from "styled-components";

interface ContainerProps {
  expanded: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border: 1px solid;
  border-radius: 4px;

  button {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    width: 100%;
    background: transparent;

    ${props =>
      props.expanded &&
      css`
        border-bottom: 1px solid;
      `}

    p {
      font-size: 3.6rem;
      margin-left: 24px;
    }
  }

  > p {
    padding: 8px 24px;
    font-size: 2rem;
  }
`;
