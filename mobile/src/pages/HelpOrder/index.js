import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { helpOrderRequest } from '~/store/modules/helpOrder/actions';
import { Container, Content, HelpText, ButtonHelp } from './styles';

import logo from '~/assets/small_logo.png';

export default function HelpOrder({ navigation }) {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');

  const loading = useSelector(state => state.helpOrder.loading);
  const id = useSelector(state => state.auth.id);

  function handleHelpOrder() {
    navigation.goBack();
    dispatch(helpOrderRequest(id, question));
  }

  return (
    <>
      <Container>
        <Content>
          <HelpText
            name="question"
            multiline
            numberOfLines={5}
            placeholder="Digite sua dúvida"
            onChangeText={t => setQuestion(t)}
          />
          <ButtonHelp onPress={handleHelpOrder} loading={loading}>
            Enviar solicitação
          </ButtonHelp>
        </Content>
      </Container>
    </>
  );
}

HelpOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={logo} />,
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#444" />
    </TouchableOpacity>
  ),
});
