import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background: #f5f5f5f5;
`;

export const Question = styled.View`
  padding: 20px;
  background: #fff;
  border-radius: 5px;

  border: 1px solid #ddd;
`;

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Answer = styled.View`
  margin-top: 20px;
`;

export const TextStyle = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 20;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;

  margin-bottom: 15px;
`;
