import styled from "styled-components";

import image from "~/assets/image.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 16px;

  height: 90%;
  background: url(${image}) no-repeat cover;

  form {
    max-width: 320px;
    width: 100%;

    div + div {
      margin-top: 8px;
    }

    button {
      margin-top: 16px;
      font-size: 2.4rem;
    }
  }
`;
