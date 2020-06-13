import styled from "styled-components";

export const Container = styled.div`
  header {
    display: flex;
    flex-direction: column;

    margin-top: 56px;

    h1 {
      font-size: 3.6rem;
      color: #325bbf;
      margin-bottom: 16px;
    }

    input {
      margin: 0 16px;

      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid;

      flex: 1;
      max-width: 527px;
    }
  }
`;

export const CourseListContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 48px auto 0;

  > div {
    margin: 0 auto;
    flex: 1;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(216px, 1fr));
    column-gap: 16px;
    row-gap: 24px;
  }
`;

export const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  margin: 0 auto;

  background: #fff;
  width: 216px;

  border: 1px solid;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;

  img {
    margin-top: -1px;
    width: 216px;
    height: 124px;
    border-radius: 4px 4px 0 0;
  }

  p {
    margin: 24px 8px 16px;
    font-weight: 500;
    color: #101451;
  }

  span {
    color: #325bbf;

    & + span {
      margin-top: 4px;
    }
  }

  a {
    margin: 16px 0 8px;
    color: #ef5912;
    padding: 8px 16px;
    text-decoration: underline;
    font-size: 2.4rem;
    font-weight: 500;
  }

  /* width: 50px; */
`;
