import styled from "styled-components";

export const Container = styled.div`
  margin-top: 40px;
  padding: 0 32px;

  display: flex;
  justify-content: space-between;

  main {
    width: 100%;
    margin-right: 16px;

    section {
      position: sticky;
      top: 0;

      width: 735px;
      height: 100%;
      max-height: 468px;

      iframe {
        width: 100%;
        height: 468px;
      }
    }
  }

  div {
    > p {
      margin: 0 auto;
      max-width: 180px;
      text-align: center;
      margin-top: 8px;
    }
  }

  aside {
    border: 1px solid #101451;
    border-radius: 4px;
    background: #fff;

    font-weight: 500;
    color: #325bbf;

    width: 336px;
    /* width: 100%; */
    /* flex: 1; */

    header {
      display: flex;
      align-items: center;

      padding: 16px 24px;

      text-align: center;

      img {
        border-radius: 4px;
        margin-right: 16px;

        width: 40px;
        height: 40px;
      }
    }

    ul {
      list-style: none;

      padding: 24px 48px;
      font-size: 2rem;

      border-top: 1px solid #101451;
      border-bottom: 1px solid #101451;
    }

    > button {
      background: transparent;
      padding: 24px;
      margin: 0 auto;

      display: flex;
      align-items: center;

      color: rgba(4, 5, 34, 0.7);

      transition: color 0.2s;

      &:hover {
        color: rgba(239, 89, 18, 0.8);
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 16px;

  h1 {
    color: #325bbf;
    font-size: 2.4rem;

    /* max-width: 300px; */
  }

  div {
    display: flex;
    align-items: center;
    justify-items: center;

    margin-left: 16px;
  }

  a {
    display: flex;
    align-items: center;
    justify-items: center;

    background: rgba(93, 137, 252, 0.2);
    padding: 8px;
    color: #5d89fc;
    border-radius: 8px;

    & + a {
      margin-left: 32px;
    }

    svg {
      margin-right: 8px;
    }
  }
`;

export const ExameDetail = styled.div`
  section {
    background: #fff;
    border-radius: 8px;
    padding: 16px 32px;

    border: 1px solid;

    h2 {
      margin-bottom: 16px;
      font-size: 2.4rem;
    }

    ul {
      list-style: none;

      li {
        display: flex;
        align-items: center;
        font-size: 2.4rem;

        & + li {
          margin-top: 8px;
        }

        svg {
          margin-right: 4px;
        }
      }
    }
  }

  button {
    margin-top: 32px;
    font-size: 2.4rem;

    background: #325bbf;
  }
`;
