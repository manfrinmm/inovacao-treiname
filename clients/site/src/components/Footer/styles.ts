import styled from "styled-components";

export const Container = styled.footer`
  background: #fff;
  box-shadow: 0 -3px 6px rgba(120, 136, 182, 0.5);
  margin-top: auto;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 16px 24px;

  display: flex;
  justify-content: space-between;

  section {
    & + section {
      margin-left: 16px;
    }

    h2 {
      color: #325bbf;
      font-size: 2.4rem;
      margin-bottom: 8px;
    }

    p {
      & + p {
        margin-top: 8px;
      }

      a {
        strong {
          display: flex;
          align-items: center;
        }

        svg {
          color: #13e27b;
          margin-left: 4px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;

    section + section {
      margin-left: 0;
      margin-top: 16px;
    }

    section {
      text-align: center;

      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
