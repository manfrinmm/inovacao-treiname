import styled from "styled-components";

export const Container = styled.div`
  header {
    margin: 40px 0;
    h1 {
      color: #325bbf;
    }
  }
`;

export const Report = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 3.2rem;
    color: #325bbf;
    margin: 64px 0 32px;
  }

  table {
    text-align: center;
    margin: 0 auto 32px;

    border-collapse: separate;
    border-spacing: 0 8px;

    thead td {
      font-weight: 500;
      padding: 0 8px;
      text-align: center;
    }

    tbody {
      td {
        border: 0;
        border-style: solid none;
        padding: 16px;
        background: #fff;

        &:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:last-child {
          border-bottom-right-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
    }
  }
`;
