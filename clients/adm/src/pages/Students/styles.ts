import styled from "styled-components";

export const Container = styled.div`
  margin-top: 80px;

  display: flex;
  flex-direction: column;

  form {
    > div {
      margin: 0 auto;
      max-width: 500px;
    }
  }
`;

export const StudentsContainer = styled.div`
  max-width: 640px;
  width: 100%;
  margin: 40px auto;
`;

export const StudentContent = styled.div`
  border: 1px solid #707070;
  margin-bottom: 8px;

  background: #fff;
  padding: 16px 16px 16px 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;

  div {
    p {
      font-size: 24px;
      margin-bottom: 4px;
    }

    span {
      color: #7888b6;
    }
  }

  a {
    margin-left: auto;
  }
`;
