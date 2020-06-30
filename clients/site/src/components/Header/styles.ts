import { Link as Linker } from "react-router-dom";

import styled, { css } from "styled-components";

interface MenuProps {
  isOpen: boolean;
}

export const Container = styled.div`
  background: #101451;
  height: 96px;

  box-shadow: 0 1px 8px #000;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 12px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 64px;
    padding: 4px 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const Menu = styled.div<MenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  z-index: 1;

  nav {
    display: flex;
    justify-content: space-between;

    flex: 1;

    div {
      display: flex;
      align-items: center;

      max-width: 300px;
      flex: 1;

      button:first-child {
        background: #f0f2f5;
        color: #101451;
        margin-right: 16px;
      }
    }
  }
  /* @media (max-width: 580px) { */

  @media (max-width: 792px) {
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
            flex-direction: column;
            justify-content: center;
            width: 100%;

            p {
              display: block;
            }

            button:first-child {
              margin-bottom: 16px;
              margin-right: 0;
            }
          }

          background: #9cbef6;
        }
      `}

    span {
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

          /* box-shadow: 0 0 0 200vw #000; */

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

export const ButtonLogout = styled.button`
  padding: 8px 24px;
`;

export const Link = styled(Linker)`
  color: #f5f7fe;
  text-decoration: underline;
  font-size: 3.2rem;

  margin: 0 auto;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  flex: 0;

  p {
    color: #f0f2f5;
    margin-bottom: 8px;
  }

  button {
    background: #f0f2f5;
    color: #101451;
    /* height: 45px; */
    width: 40%;
    padding: 8px;
  }

  @media (max-width: 480px) {
    p {
      display: none;
    }
  }
`;
