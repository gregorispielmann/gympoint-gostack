import React from 'react';

import PropTypes from 'prop-types';

import { NewButton } from './styles';

export default function Button({ children, type, color, onClick }) {
  return (
    <NewButton type={type} color={color} onClick={onClick}>
      {children}
    </NewButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: null,
};
