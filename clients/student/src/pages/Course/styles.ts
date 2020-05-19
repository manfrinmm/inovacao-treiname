import styled from "styled-components";

export const Container = styled.div`
  margin-top: 40px;
  padding: 0 32px;

  display: flex;
  justify-content: space-between;

  main {
    width: 100%;
    /* height: 100%; */

    margin-right: 48px;

    section {
      height: 100%;

      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }

  aside {
    border: 1px solid #101451;
    border-radius: 4px;
    background: #fff;

    font-weight: 500;
    color: #325bbf;

    header {
      display: flex;
      align-items: center;

      padding: 16px 24px;

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

  h1 {
    color: #325bbf;
    font-size: 3.2rem;
  }

  div {
    display: flex;
    align-items: center;
  }
  a {
    display: flex;
    align-items: center;

    background: rgba(93, 137, 252, 0.2);
    padding: 8px;
    color: #5d89fc;
    border-radius: 8px;

    & + a {
      margin-left: 32px;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const ModuleItem = styled.li`
  button {
    background: transparent;
    transition: color 0.2s;
    /* color: rgba(239, 89, 18, 1); */

    &:hover {
      color: rgba(239, 89, 18, 0.8);
    }
  }

  & + li {
    margin-top: 8px;
  }
`;
