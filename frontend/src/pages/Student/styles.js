import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

  h1 {
    color: #444;
    font-size: 24px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;

  menu {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 20px;

    div {
      display: flex;
      align-items: center;
    }
  }

  .form {
    padding: 30px 20px;

    background: #fff;
    border-radius: 5px;

    .error {
      display: flex;
      align-items: center;
      color: red;
      margin-bottom: 10px;

      .icon {
        margin-right: 5px;
        size: 2em;
      }
    }

    input {
      width: 100%;
      padding: 15px;
      margin: 5px 0 15px 0;
      border: 1px solid #ddd;
      border-radius: 5px;

      font-size: 16px;
    }

    span {
      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .col-3 {
    display: flex;

    div {
      width: 100%;
      margin: 0 5px;
    }
  }
`;
