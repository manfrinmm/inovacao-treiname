import styled from "styled-components";

interface ContainerProps {
  isSelected: boolean;
}

export const Container = styled.li<ContainerProps>`
  button {
    font-weight: 500;
    text-align: left;

    background: transparent;
    transition: color 0.2s;
    color: ${props => (props.isSelected ? "#EF5912" : "#325BBF")};

    &:hover {
      color: rgba(239, 89, 18, 0.7);
    }
  }

  & + li {
    margin-top: 8px;
  }
`;
