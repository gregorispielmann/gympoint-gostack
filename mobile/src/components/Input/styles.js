import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  height: 46px;
  border-radius: 5px;
  border: 1px solid #ddd;

  flex-direction: row;
  align-items: center;
`;

export const InputIcon = styled(Icon)`
  margin-left: 10px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin-left: 10px;
  background: #fff;
  color: #444;
  font-size: 16px;
`;
