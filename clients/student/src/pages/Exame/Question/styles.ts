import styled from "styled-components";

interface ContainerProps {
  isErrored: boolean;
}

interface ContentProps {
  expanded: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border: 1px solid ${props => props.isErrored && "#ef5912"};
  border-radius: 8px;

  button {
    padding: 8px 16px;

    background: transparent;
    width: 100%;

    display: flex;
    align-items: center;

    svg {
      color: #101451;
      margin-right: 16px;
    }
  }

  > div {
    p {
      padding: 8px 24px;
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
  display: ${props => !props.expanded && "none"};
`;

export const Option = styled.div`
  display: flex;

  div {
    margin-right: 8px;

    label {
      display: flex;
      align-items: center;

      font-weight: 500;

      label {
        color: #325bbf;
      }

      input[type="radio"] {
        margin-left: 8px;

        &:checked {
          border: 1px solid #ef5912;
        }
      }
    }
  }
`;
