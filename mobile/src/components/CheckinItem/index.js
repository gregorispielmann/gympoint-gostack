import React, { useMemo } from 'react';

import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import PropTypes, { any } from 'prop-types';

import { Container, Left, Right } from './styles';

export default function CheckinItem({ data }) {
  const date = useMemo(() => {
    return formatDistance(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Left>Check-in #{data.id}</Left>
      <Right>{date}</Right>
    </Container>
  );
}

CheckinItem.propTypes = {
  data: PropTypes.objectOf(any),
};

CheckinItem.defaultProps = {
  data: null,
};
