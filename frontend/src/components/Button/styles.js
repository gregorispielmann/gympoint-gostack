import styled from 'styled-components';

import { darken } from 'polished';

export const NewButton = styled.button`
  border: 0;
  border-radius: 5px;
  padding: 10px;

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;

  margin-left: 20px;

  background: ${props => props.color || '#fff'};

  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s background;

  span {
    margin-right: 5px;
  }

  &:hover {
    background: ${props => darken(0.07, props.color)};
  }
`;
