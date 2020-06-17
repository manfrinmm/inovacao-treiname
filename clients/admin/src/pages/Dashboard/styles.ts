import { Link as Linker } from "react-router-dom";

import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 32px 0;

  section {
    display: flex;
    flex-direction: column;

    h2 {
      color: #f90;
    }

    hr {
      height: 2px;
      border: 0;
      background: #ccc;
      margin: 0 0 16px;
    }

    > div {
      display: flex;
      justify-content: flex-start;
    }

    & + section {
      margin-top: 32px;
    }
  }
`;

export const ContentItem = styled(Linker)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;

  background: #325bbf;
  border-radius: 8px;
  padding: 16px;

  transition: 0.5s;

  &:hover {
    transform: translate(4px, -4px);
    background: ${shade(0.2, "#325bbf")};
  }

  & + a {
    margin-left: 32px;
  }

  svg {
    color: #f5f7fe;
    margin-bottom: 8px;
  }

  p {
    font-size: 2.4rem;
    color: #f5f7fe;
    text-align: center;
  }
`;
