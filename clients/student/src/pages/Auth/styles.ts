import styled from "styled-components";

import image from "~/assets/image.png";

export const Container = styled.div`
  height: 100%;
  background: url(${image}) no-repeat cover;

  form {
    max-width: 320px;
    button {
      font-size: 2.4rem;
    }
  }
`;
