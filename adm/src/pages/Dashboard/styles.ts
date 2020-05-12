import { Link as Linker } from "react-router-dom";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Link = styled(Linker)`
  font-size: 3.6rem;
  background: #325bbf;
  color: #f5f7fe;
  width: 204px;
  height: 130px;
  padding: 24px 16px;
  margin: 32px;
  text-align: center;
  border-radius: 8px;
`;
