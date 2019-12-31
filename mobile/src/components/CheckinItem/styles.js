import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 5px 20px;
  margin: 8px 0;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

  height: 46px;
`;

export const Left = styled.Text`
  font-weight: bold;
  color: #444;
  font-size: 14px;
`;

export const Right = styled.Text`
  color: #666;
  font-size: 14px;
`;
