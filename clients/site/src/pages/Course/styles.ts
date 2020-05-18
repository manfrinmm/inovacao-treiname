import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5.6rem;

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: fit-content;
    position: sticky;
    top: 16px;

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
      margin: 16px;
    }

    button {
      font-size: 3.2rem;
      margin-bottom: 4px;
    }
  }

  article {
    max-width: 736px;

    h1 {
      text-align: center;
      font-size: 3.6rem;
    }

    h1 + section {
      display: flex;
      justify-content: space-between;
      margin: 40px 0 16px;

      p {
        font-size: 2.4rem;
      }
    }

    .description {
      font-size: 2.4rem;
    }

    h2 {
      font-size: 3.6rem;
      margin: 48px 0 16px;
    }
  }
`;

export const WillLearn = styled.section`
  background: #fff;
  border: 1px solid;
  border-radius: 8px;
  padding: 16px 8px;
  margin-top: 24px;

  h3 {
    font-size: 2.4rem;
    margin-bottom: 16px;
  }

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, 352px);
    gap: 8px;
  }
`;

export const LearnItem = styled.div`
  display: flex;
  /* align-items: center; */
  p {
    font-size: 2.4rem;
  }
  svg {
    margin-right: 4px;
    width: 24px;
    height: 24px;
  }
`;

export const Modules = styled.section`
  div + div {
    margin-top: 8px;
  }
`;

export const Info = styled.section`
  margin-top: 8px;

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
