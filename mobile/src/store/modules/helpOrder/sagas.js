import { all, takeLatest, call, put } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';

import { helpOrderSuccess, helpOrderFailure } from './actions';

export function* helpOrder({ payload }) {
  try {
    const { id, question } = payload;

    yield call(api.post, `students/${id}/help-orders`, {
      question,
    });

    Alert.alert('Pedido de ajuda realizado com sucesso');
    yield put(helpOrderSuccess());
  } catch (e) {
    Alert.alert('Erro', 'Problema ao fazer pedido de ajuda');
    yield put(helpOrderFailure());
  }
}

export default all([takeLatest('@helpOrder/HELPORDER_REQUEST', helpOrder)]);
