import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  padding: 20px 30px;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      padding-right: 30px;
    }

    menu {
      display: flex;
      align-items: center;
      padding-left: 30px;
      border-left: 1px solid #ddd;
      height: 30px;

      font-size: 15px;
      font-weight: bold;

      a {
        color: #999;
        padding-right: 20px;

        transition: 0.2s color;
      }

      a:hover {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    align-items: flex-end;

    color: #666666;
    font-size: 14px;

    button {
      border: 0;
      color: #de3b3b;
    }
  }
`;
