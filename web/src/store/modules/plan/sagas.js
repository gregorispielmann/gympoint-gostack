import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  addPlanFailure,
  addPlanSuccess,
  updatePlanSuccess,
  updatePlanFailure,
} from './actions';

export function* addPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, '/plans', {
      title,
      duration,
      price,
    });

    yield put(addPlanSuccess());

    toast.success(`Plano ${title} adicionado com sucesso`);

    history.push('/plans');
  } catch (e) {
    yield put(addPlanFailure());

    toast.error('Falha ao adicionar plano');
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    yield call(api.put, `/plans/${id}`, {
      title,
      duration,
      price,
    });

    yield put(updatePlanSuccess());

    toast.success(`Plano ${title} atualizado com sucesso`);

    history.push('/plans');
  } catch (e) {
    yield put(updatePlanFailure());

    toast.error('Falha ao atualizar plano');
  }
}

export default all([
  takeLatest('@plan/ADD_PLAN_REQUEST', addPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
]);
