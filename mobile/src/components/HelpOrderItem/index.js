import React, { useMemo } from 'react';

import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import PropTypes, { any } from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Content,
  HelpOrderText,
  Status,
  StatusAnswer,
  Time,
  Title,
} from './styles';

export default function HelpOrderItem({ data }) {
  const date = useMemo(() => {
    return formatDistance(parseISO(data.updatedAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Status>
        {data.answer === null ? (
          <StatusAnswer>
            <Icon name="check-circle" color="gray" size={20} />
            <Title color="gray">Sem resposta</Title>
          </StatusAnswer>
        ) : (
          <StatusAnswer>
            <Icon name="check-circle" color="limegreen" size={20} />
            <Title color="limegreen">Respondido</Title>
          </StatusAnswer>
        )}
        <Time>{date}</Time>
      </Status>
      <Content>
        <HelpOrderText numberOfLines={3}>{data.question}</HelpOrderText>
      </Content>
    </Container>
  );
}

HelpOrderItem.propTypes = {
  data: PropTypes.objectOf(any),
};

HelpOrderItem.defaultProps = {
  data: null,
};
