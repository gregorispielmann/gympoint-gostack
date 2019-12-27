import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 50px 30px;

  width: 100%;
  max-width: 360px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  .error {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 5px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    margin-top: 30px;
  }

  input {
    padding: 15px;
    margin: 5px 0 15px 0;
    border: 1px solid #ddd;
    border-radius: 5px;

    font-size: 16px;
  }

  strong {
    color: #444;
    font-size: 14px;
    font-weight: bold;
  }

  span {
    flex-direction: start;
    color: red;
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 20px 0;
    background: #eee;
    padding: 10px;
    border-radius: 5px;
  }

  button {
    border: 0;
    border-radius: 5px;
    padding: 15px 10px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    background: #ee4d64;

    transition: background 0.2s;

    &:hover {
      background: ${darken(0.07, '#ee4d64')};
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
`;
