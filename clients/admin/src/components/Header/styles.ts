import { Link as Linker } from "react-router-dom";

import styled from "styled-components";

import Button from "../Button";

export const Container = styled.div`
  font-size: 3.6rem;
  font-weight: medium;

  background: #101451;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    a {
      font-size: 2rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const ButtonLogout = styled(Button)`
  padding: 8px 24px;
  background: #eee;
  color: #ff9900;
  margin-left: 16px;
`;

export const Link = styled(Linker)`
  color: #f5f7fe;
`;
