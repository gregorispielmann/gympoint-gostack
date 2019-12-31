import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TInput, InputIcon } from './styles';

function Input({ style, onChange, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <InputIcon name={icon} size={25} color="#999" />}
      <TInput {...rest} ref={ref} onChangeText={onChange} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default forwardRef(Input);
