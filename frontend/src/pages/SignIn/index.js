import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

import { MdWarning } from 'react-icons/md';

import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Loading } from './styles';

import logo from '~/assets/logo.svg';

function showError(message) {
  return (
    <div className="error">
      <MdWarning className="icon" /> {message}
    </div>
  );
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required(showError('O e-mail é obrigatório')),
  password: Yup.string().required(showError('A senha é obrigatória')),
});

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="Gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input
          disabled={loading}
          type="email"
          name="email"
          placeholder="E-mail"
        />
        <strong>SUA SENHA</strong>
        <Input
          disabled={loading}
          type="password"
          name="password"
          placeholder="Senha"
        />
        {loading ? (
          <Loading>
            <ReactLoading
              type="spin"
              color="#ee4d64"
              height="15%"
              width="15%"
            />
          </Loading>
        ) : (
          <button type="submit">Entrar no sistema</button>
        )}
      </Form>
    </Container>
  );
}
