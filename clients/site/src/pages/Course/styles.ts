import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid;
    border-radius: 4px;
    padding: 8px 8px 24px;
    margin-right: 24px;

    background: #fff;
    box-shadow: 1px 5px 6px rgba(0, 0, 0, 0.16);

    img {
      width: 336px;
      height: 260px;

      border-radius: 4px;
    }

    h1 {
      color: #325bbf;
      font-size: 3.2rem;
      margin: 8px 16px;
    }

    button {
      font-size: 3.2rem;
      margin-bottom: 4px;
    }
  }
`;

export const Info = styled.section`
  > p {
    font-size: 3.2rem;
    margin-bottom: 16px;
  }

  div {
    display: flex;
    align-items: center;

    p {
      font-size: 2.4rem;
      margin-left: 8px;
    }

    & + div {
      margin-top: 4px;
    }
  }
`;
