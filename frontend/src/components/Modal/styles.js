import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background-color: #fff;
    padding: 30px;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;

    header {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      button {
        border: 0;
      }
    }

    .content {
      width: 100%;
    }

    .title {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      line-height: 1.6;

      text-transform: uppercase;
    }

    .question {
      margin-top: 10px;
      line-height: 1.6;
      color: #666;
      font-size: 16px;
    }

    .answer {
      margin-top: 20px;
      width: 100%;

      button {
        margin-top: 10px;
        width: 100%;
        margin-left: 0;

        text-align: center;
        font-size: 16px;
        text-transform: capitalize;
      }

      textarea {
        margin-top: 5px;
        width: 100%;
        height: 100%;
        min-height: 125px;

        border: 1px solid #ddd;
        border-radius: 5px;

        resize: none;
        padding: 5px 10px;

        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #444;
      }
    }
  }
`;
