import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  addRegistrationFailure,
  addRegistrationSuccess,
  updateRegistrationSuccess,
  updateRegistrationFailure,
} from './actions';

export function* addRegistration({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload;

    yield call(api.post, '/registrations', {
      student_id,
      plan_id,
      start_date,
    });

    yield put(addRegistrationSuccess());

    toast.success(`Matrícula adicionado com sucesso`);

    history.push('/registrations');
  } catch (e) {
    yield put(addRegistrationFailure());

    toast.error('Falha ao adicionar matrícula! Verifique todos os campos!');
  }
}

export function* updateRegistration({ payload }) {
  try {
    const { id, student_id, plan_id, start_date } = payload;

    yield call(api.put, `/registrations/${id}`, {
      student_id,
      plan_id,
      start_date,
    });

    yield put(updateRegistrationSuccess());

    toast.success(`Matrícula atualizada com sucesso`);

    history.push('/registrations');
  } catch (e) {
    yield put(updateRegistrationFailure());

    toast.error('Falha ao atualizar matrícula! Verifique todos os campos!');
  }
}

export default all([
  takeLatest('@registration/ADD_REGISTRATION_REQUEST', addRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
]);
