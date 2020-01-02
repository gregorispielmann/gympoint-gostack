import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  addStudentFailure,
  addStudentSuccess,
  updateStudentSuccess,
  updateStudentFailure,
} from './actions';

export function* addStudent({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    yield call(api.post, '/students', {
      name,
      email,
      age,
      weight,
      height,
    });

    yield put(addStudentSuccess());

    toast.success(`Aluno ${name} adicionado com sucesso`);

    history.push('/students');
  } catch (e) {
    yield put(addStudentFailure());

    toast.error('Falha ao adicionar aluno');
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload;

    yield call(api.put, `/students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    yield put(updateStudentSuccess());

    toast.success(`Aluno ${name} atualizado com sucesso`);

    history.push('/students');
  } catch (e) {
    yield put(updateStudentFailure());

    toast.error('Falha ao atualizar aluno');
  }
}

export default all([
  takeLatest('@student/ADD_STUDENT_REQUEST', addStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
]);
