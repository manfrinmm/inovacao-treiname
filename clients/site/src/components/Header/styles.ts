import { Link as Linker } from "react-router-dom";

import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  background: #101451;
  height: 96px;

  box-shadow: 0 1px 8px #000;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 56px;
    /* background: ${shade(0.1, "#101451")}; */
  }
`;

export const ButtonLogout = styled.button`
  padding: 8px 24px;
`;

export const Link = styled(Linker)`
  color: #f5f7fe;
  text-decoration: underline;
  font-size: 3.2rem;
`;
