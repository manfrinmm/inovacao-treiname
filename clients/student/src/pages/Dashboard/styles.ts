import styled, { css } from "styled-components";

interface CourseProp {
  status: "Esperando confirmar pagamento" | "Expirado" | null;
}

export const Container = styled.div`
  margin-top: 24px;

  header {
    display: flex;
    align-items: baseline;

    font-size: 2.4rem;
    color: #325bbf;

    p {
      margin-left: 8px;
      font-size: 2.4rem;
      font-weight: 300;
    }
  }

  section {
    display: grid;
    gap: 16px 32px;
    grid-template-columns: repeat(auto-fill, 208px);

    margin-top: 32px;
  }
`;

export const Course = styled.button<CourseProp>`
  background: transparent;

  border: 1px solid;
  border-radius: 4px;

  ${props =>
    !props.status &&
    css`
      box-shadow: 1px 3px 8px rgba(16, 20, 81, 0.4);
    `}

  min-height: 281px;

  padding: 8px;

  display: flex;
  flex-direction: column;

  text-align: center;

  position: relative;

  div {
    ${props => {
      if (props.status === "Esperando confirmar pagamento") {
        return css`
          opacity: 0.5;
        `;
      }

      if (props.status === "Expirado") {
        return css`
          opacity: 0.2;
        `;
      }
    }}

    img {
      border-radius: 4px;

      width: 192px;
      height: 144px;
      margin-bottom: 24px;
    }
  }

  > strong {
    top: 50px;
    left: 0;
    right: 0;

    font-size: 2.4rem;
    position: absolute;
  }

  &:hover {
    ${props =>
      !props.status
        ? css`
            transform: translateY(-8px);
          `
        : css`
            cursor: default;
          `}
  }
`;
