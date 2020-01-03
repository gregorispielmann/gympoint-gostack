import React, { useState, useEffect } from 'react';
import PropTypes, { any } from 'prop-types';
import AsyncSelect from 'react-select/async';
import api from '~/services/api';
import { selectStyle } from '~/styles/select';

const loadingMessage = () => 'Carregando...';
const noOptionsMessage = () => 'Nenhum resultado';

const filterOptions = async inputValue => {
  const res = await api.get(`students?q=${inputValue}`);

  const options = res.data.map(s => ({ label: s.name, value: s.id }));
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    resolve(filterOptions(inputValue));
  });

export default function ReactAsyncSelect({
  name,
  label,
  defaultValue,
  onChange,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  console.tron.log(defaultValue);
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}

      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        styles={selectStyle}
        loadingMessage={loadingMessage}
        noOptionsMessage={noOptionsMessage}
        placeholder="Selecione uma opção"
        value={value}
        name={name}
        onChange={i => {
          onChange(i);
          setValue(i);
        }}
      />
    </>
  );
}

ReactAsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.objectOf(any),
    PropTypes.arrayOf(any),
  ]),
};

ReactAsyncSelect.defaultProps = {
  label: '',
  defaultValue: '',
};
