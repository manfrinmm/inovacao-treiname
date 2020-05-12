import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.button`
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 24px;

  background: #101451;
  color: #f5f7fe;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  svg {
    margin-right: 16px;
  }
  /* Pegar a cor do botão pelo className para colocar o hover aqui */
  &:hover {
    background: ${shade(0.4, "#101451")};
  }
`;
