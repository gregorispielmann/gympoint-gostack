import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { TiWarningOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { Container, Content } from './styles';

import Button from '~/components/Button';
import {
  addPlanRequest,
  updatePlanRequest,
} from '~/store/modules/plan/actions';
import api from '~/services/api';

function showError(message) {
  return (
    <div className="error">
      <TiWarningOutline className="icon" /> {message}
    </div>
  );
}

const schema = Yup.object().shape({
  title: Yup.string().required(showError('Título é obrigatório')),
  duration: Yup.number()
    .positive()
    .min(1, showError('Duração inválida'))
    .max(200, showError('Duração inválida'))
    .required(showError('Duração é obrigatória'))
    .typeError(showError('Duração inválida')),
  price: Yup.number()
    .positive()
    .min(1.0, showError('Preço inválido'))
    .max(10000.0, showError('Preço inválido'))
    .required(showError('Preço é obrigatório'))
    .typeError(showError('Preço inválido')),
});

export default function Plan({ location }) {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [newDuration, setNewDuration] = useState(1);
  const [newTotal, setNewTotal] = useState(0);
  const [initialData, setInitialData] = useState({});

  const loading = useSelector(state => state.plan.loading);

  const id = location.state ? location.state.id : null;

  /** SET INITIAL DATA TO FORM */
  useEffect(() => {
    async function loadPlan() {
      const res = await api.get(`/plans/${id}`);

      setInitialData({
        title: res.data.title,
        duration: res.data.duration,
        price: res.data.price,
      });

      setNewPrice(res.data.price);
      setNewDuration(res.data.duration);

      setNewTotal(
        (res.data.price * res.data.duration).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      );

      setEditing(true);
    }

    if (id) loadPlan();
  }, [id, location.state]);

  /** SET NEW TOTAL ON CHANGE */
  useEffect(() => {
    setNewTotal(newDuration * newPrice);
  }, [newPrice, newDuration]);

  /** HANDLE SUBMIT */
  function handleSubmit({ title, duration, price }) {
    if (!editing) {
      dispatch(addPlanRequest(title, duration, price));
    } else {
      dispatch(updatePlanRequest(id, title, duration, price));
    }
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
          <menu>
            <h1>{editing ? 'Edição de Plano' : 'Cadastro de Plano'}</h1>

            <div>
              <Link to="/plans">
                <Button type="button" color="#ccc">
                  <MdChevronLeft size={20} />
                  <span />
                  voltar
                </Button>
              </Link>
              {loading ? (
                <ReactLoading
                  type="spin"
                  color="#ee4d64"
                  height="15%"
                  width="15%"
                />
              ) : (
                <Button type="submit" color="#EE4D64">
                  <MdCheck size={20} />
                  <span />
                  salvar
                </Button>
              )}
            </div>
          </menu>
          <div className="form">
            <span>título do plano</span>
            <Input type="text" name="title" disabled={loading} />
            <br />

            <div className="col-3">
              <div>
                <span>Duração (em meses)</span>
                <br />
                <Input
                  type="number"
                  name="duration"
                  min="0"
                  step="1"
                  disabled={loading}
                  onKeyUp={e => {
                    setNewDuration(e.target.value);
                  }}
                />
              </div>
              <div>
                <span>preço mensal</span>
                <br />
                <Input
                  type="number"
                  name="price"
                  step="0.1"
                  min="0"
                  disabled={loading}
                  onKeyUp={e => {
                    setNewPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <span>preço total</span>
                <br />
                <Input
                  type="text"
                  disabled
                  name="total"
                  value={newTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

Plan.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
