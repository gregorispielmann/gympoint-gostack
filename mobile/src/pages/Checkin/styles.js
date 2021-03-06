import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  background: #f5f5f5f5;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ButtonCheck = styled(Button)`
  margin-bottom: 10px;
`;
