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

      .icon {
        margin-right: 10px;
      }
    }

    span,
    label {
      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .col-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 5px;

    div {
      .react-datepicker-wrapper {
        width: 100%;
      }
      input {
        width: 100%;
        margin-top: 5px;
        height: 45px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;

        font-size: 16px;

        &:disabled {
          background: #f5f5f5;
        }
      }
    }
  }
`;
