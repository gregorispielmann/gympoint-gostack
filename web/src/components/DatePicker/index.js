import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';

import pt from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

export default function DatePicker({ name, onSelect, value }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        name={fieldName}
        selected={value || selected}
        onChange={date => {
          setSelected(date);
          onSelect(date);
        }}
        ref={ref}
        locale="pt"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
};
