import styled from "styled-components";

import image from "~/assets/image.png";

export const Container = styled.div`
  height: 100%;
  background: url(${image}) no-repeat cover;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 32px;

  h1 {
    margin-bottom: 16px;
    font-weight: 400;
    color: #325bbf;
  }

  form {
    max-width: 320px;

    div + div {
      margin-top: 8px;
    }

    input {
      :disabled {
        background: transparent;
      }
    }

    button {
      margin-top: 16px;

      font-size: 2.4rem;
    }
  }
`;
