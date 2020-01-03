import { all, takeLatest, call, put } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    if (!id) Alert.alert('ID obrigatório', 'Preencha seu ID para entrar');

    const res = yield call(api.get, `sessions/${id}`);

    const { active } = res.data;

    if (!active) {
      Alert.alert(`Matrícula do ID ${id} não está ativa`);
      yield put(signInFailure());
      return false;
    }

    yield put(signInSuccess(id, active));
    Alert.alert('Logado!', `ID ${id} logado com sucesso!`);
  } catch (e) {
    Alert.alert('Matrícula não encontrada para este ID');

    yield put(signInFailure());
  }
}

export function signOut() {
  Alert.alert('Você foi desconectado com sucesso!');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
