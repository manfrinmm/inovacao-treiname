import styled from "styled-components";

export const Container = styled.div`
  margin-top: 80px;

  display: flex;
  align-items: center;
  flex-direction: column;

  header {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 600px;

    input {
      margin: 0 16px;

      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid;

      flex: 1;
    }
  }

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
