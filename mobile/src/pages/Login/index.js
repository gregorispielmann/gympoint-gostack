import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

import logo from '~/assets/logo.png';

export default function Login() {
  const [id, setId] = useState();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          icon="perm-identity"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          onChange={t => setId(t)}
        />
        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
