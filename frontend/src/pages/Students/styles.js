import styled from 'styled-components';

import { darken } from 'polished';

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
  max-width: 1200px;

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

  .search {
    position: relative;

    .icon {
      position: absolute;
      top: 25%;
      left: 20px;
      font-size: 18px;
      color: #999;
    }

    input {
      text-indent: 25px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 0 0 0 10px;
      font-size: 16px;
    }
  }

  .content {
    padding: 20px 30px 5px 30px;

    background: #fff;
    border-radius: 5px;

    label {
      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;

      thead {
        text-align: left;
        text-transform: uppercase;
        color: #444;
      }

      th {
        height: 40px;
        font-size: 16px;
      }

      tbody {
        line-height: 4;
      }

      td {
        border-bottom: 1px solid #eee;
        color: #666;
        font-size: 16px;
      }

      tr:last-of-type {
        td {
          border: 0;
        }
      }

      .age {
        text-align: center;
        width: 20%;
      }

      .edit {
        text-align: center;
        button {
          border: 0;
          color: #4d85ee;

          transition: 0.2s color;
        }

        button:hover {
          color: ${darken(0.3, '#4d85ee')};
        }
      }

      .delete {
        text-align: center;
        button {
          border: 0;

          color: #de3b3b;

          transition: 0.2s color;
        }

        button:hover {
          color: ${darken(0.3, '#de3b3b')};
        }
      }
    }
  }
`;
