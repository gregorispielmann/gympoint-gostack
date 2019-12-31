import { all, takeLatest, call, put } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';

import { checkInSuccess, checkInFailure } from './actions';

export function* checkin({ payload }) {
  try {
    const { id } = payload;

    yield call(api.post, `students/${id}/checkin`);

    Alert.alert('Check-in realizado com sucesso');
    yield put(checkInSuccess());
  } catch (e) {
    if (e.response.status === 400)
      Alert.alert('Ooopss!', 'Você já fez login 5 vezes essa semana!');

    Alert.alert('Erro', 'Problema ao realizar Check-in');
    yield put(checkInFailure());
  }
}

export default all([takeLatest('@checkin/CHECKIN_REQUEST', checkin)]);
