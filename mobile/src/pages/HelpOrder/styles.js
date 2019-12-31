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

export const HelpText = styled.TextInput`
  background: #fff;

  padding: 20px;
  height: 300px;

  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;

  font-size: 16px;
  color: #444;
`;

export const ButtonHelp = styled(Button)`
  margin-bottom: 10px;
`;
