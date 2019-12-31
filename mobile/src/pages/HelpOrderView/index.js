import React, { useMemo } from 'react';

import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Content,
  Question,
  Top,
  Answer,
  Title,
  Time,
  TextStyle,
} from './styles';

import logo from '~/assets/small_logo.png';

export default function HelpOrderView({ navigation }) {
  const helpOrder = navigation.getParam('item');

  const date = useMemo(() => {
    return formatDistance(parseISO(helpOrder.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [helpOrder.updatedAt]);

  return (
    <Container>
      <Content>
        <Question>
          <Top>
            <Title>PERGUNTA</Title>
            <Time>{date}</Time>
          </Top>
          <TextStyle>{helpOrder.question}</TextStyle>
          {helpOrder.answer !== null && (
            <Answer>
              <Title>RESPOSTA</Title>
              <TextStyle>{helpOrder.answer}</TextStyle>
            </Answer>
          )}
        </Question>
      </Content>
    </Container>
  );
}

HelpOrderView.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={logo} />,
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={30} color="#444" />
    </TouchableOpacity>
  ),
});
