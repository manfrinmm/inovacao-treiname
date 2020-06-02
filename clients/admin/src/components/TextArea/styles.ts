import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    margin-top: 4px;
    padding: 8px 16px;
    border: 1px solid;
    border-radius: 8px;

    &::placeholder {
      opacity: 0.4;
    }
  }
`;
