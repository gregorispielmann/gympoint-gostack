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
  addStudentRequest,
  updateStudentRequest,
} from '~/store/modules/student/actions';
import api from '~/services/api';

function showError(message) {
  return (
    <div className="error">
      <TiWarningOutline className="icon" /> {message}
    </div>
  );
}

const schema = Yup.object().shape({
  name: Yup.string().required(showError('Nome é obrigatório')),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required(showError('O e-mail é obrigatório')),
  age: Yup.number()
    .positive()
    .min(10, showError('Idade inválida'))
    .max(150, showError('Idade inválida'))
    .required(showError('Idade é obrigatória'))
    .typeError(showError('Idade inválida')),
  weight: Yup.number()
    .positive()
    .min(20, showError('Peso inválido'))
    .max(200, showError('Peso inválido'))
    .required(showError('Peso é obrigatório'))
    .typeError(showError('Peso inválido')),
  height: Yup.number()
    .positive()
    .min(1.0, showError('Altura inválida'))
    .max(2.9, showError('Altura inválida'))
    .required(showError('Altura é obrigatória'))
    .typeError(showError('Altura inválida')),
});

export default function Student({ location }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [initialData, setInitialData] = useState({});
  const loading = useSelector(state => state.student.loading);

  const id = location.state ? location.state.id : null;

  useEffect(() => {
    async function loadStudent() {
      const res = await api.get(`/students/${id}`);

      setInitialData({
        name: res.data.name,
        email: res.data.email,
        age: res.data.age,
        weight: res.data.weight,
        height: res.data.height,
      });
      setEditing(true);
    }

    if (id) loadStudent();
  }, [id, location.state]);

  function handleSubmit({ name, email, age, weight, height }) {
    if (!editing) {
      dispatch(addStudentRequest(name, email, age, weight, height));
    } else {
      dispatch(updateStudentRequest(id, name, email, age, weight, height));
    }
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
          <menu>
            <h1>{editing ? 'Edição de Aluno' : 'Cadastro de Aluno'}</h1>

            <div>
              <Link to="/">
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
            <span>Nome completo</span>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              disabled={loading}
            />
            <br />
            <span>E-mail</span>
            <Input
              type="email"
              name="email"
              placeholder="example@email.com"
              disabled={loading}
            />

            <div className="col-3">
              <div>
                <span>Idade</span>
                <br />
                <Input type="number" name="age" min="0" disabled={loading} />
              </div>
              <div>
                <span>Peso (em kg)</span>
                <br />
                <Input
                  type="number"
                  name="weight"
                  step="0.1"
                  min="0"
                  disabled={loading}
                />
              </div>
              <div>
                <span>Altura (em m)</span>
                <br />
                <Input
                  type="number"
                  name="height"
                  step="0.01"
                  min="0"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

Student.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

Student.defaultProps = {};
