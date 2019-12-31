import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  margin: 8px 0;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

  height: 150px;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StatusAnswer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: ${props => props.color};
  font-size: 14px;
  margin-left: 10px;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Content = styled.View`
  margin: 10px 0;
  align-items: stretch;
`;

export const HelpOrderText = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 25;
`;
