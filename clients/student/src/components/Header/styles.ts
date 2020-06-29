import styled, { css } from "styled-components";

interface MenuProps {
  isOpen: boolean;
}

export const Container = styled.header`
  background: #101451;

  height: 96px;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  color: #f5f7fe;
  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 64px;
    padding: 4px 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const Menu = styled.section<MenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 1;

  nav {
    display: flex;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;

      a {
        color: #f5f7fe;

        :hover {
          text-decoration: underline;
        }
      }

      p {
        margin-bottom: 8px;
      }

      span {
        opacity: 0.5;
      }
    }
  }

  button {
    width: 100px;
    height: 48px;

    font-size: 2.4rem;
    background: #f0f2f5;
    color: #101451;
    margin-left: 64px;

    padding: 0;
  }

  @media (max-width: 630px) {
    ${props =>
      props.isOpen &&
      css`
        nav {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;

          padding: 64px;

          flex-direction: column;
          justify-content: center;
          align-items: center;

          div {
            font-size: 2rem;
          }

          button {
            margin-top: 16px;
            margin-left: 0;
          }

          background: #9cbef6;
        }
      `}

    > span {
      position: relative;
      margin-left: auto;
      height: 4px;
      width: 32px;
      background: #fff;

      transition: 0.5s ease-in-out;

      &::before {
        background: #fff;

        content: "";
        position: absolute;
        top: -10px;

        height: 100%;
        width: 100%;

        transition: 0.5s ease-in-out;
      }

      &::after {
        background: #fff;

        content: "";
        position: absolute;
        bottom: -10px;

        height: 100%;
        width: 100%;

        transition: 0.5s ease-in-out;
      }

      ${props =>
        props.isOpen &&
        css`
          transform: rotate(45deg);
          order: 2;

          &::before {
            top: 0px;
            transform: rotate(90deg);
          }

          &::after {
            bottom: 0px;
            transform: rotate(90deg);
          }
        `}
    }

    a,
    p + span,
    button {
      display: none;

      ${props =>
        props.isOpen &&
        css`
          display: block;
        `}
    }
  }
`;
