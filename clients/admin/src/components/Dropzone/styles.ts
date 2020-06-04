import styled from "styled-components";

interface LabelProps {
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileInput = styled.label<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: #fff;
  border: 1px dashed ${props => (props.isErrored ? "#ed4337" : "#040522")};
  border-radius: 8px;

  padding: 16px 20px;
  height: 100%;

  color: #5d89fc;

  p {
    margin-top: 24px;
    font-size: 2rem;
    text-align: center;
  }

  input {
    display: none;
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;
