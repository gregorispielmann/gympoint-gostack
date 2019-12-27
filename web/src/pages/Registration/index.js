import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { TiWarningOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import { format, parseISO, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import ReactSelect from '~/components/ReactSelect';
import DatePicker from '~/components/DatePicker';

import { Container, Content } from './styles';

import Button from '~/components/Button';
import {
  addRegistrationRequest,
  updateRegistrationRequest,
} from '~/store/modules/registration/actions';
import api from '~/services/api';

function showError(message) {
  return (
    <div className="error">
      <TiWarningOutline className="icon" /> {message}
    </div>
  );
}


export default function Registration({ location }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);
  const [plan, setPlan] = useState({});
  const [plans, setPlans] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [newDuration, setNewDuration] = useState(0);
  const [newTotal, setNewTotal] = useState(0);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.registration.loading);

  const id = location.state ? location.state.id : null;

  /** SET INITIAL DATA TO FORM */
  useEffect(() => {
    async function loadRegistration() {
      const res = await api.get(`/registrations/${id}`);

      setStudent({
        id: res.data.student_id,
        title: res.data.student.name,
      });

      setPlan({
        id: res.data.plan_id,
        title: res.data.plan.title,
      });

      setNewPrice(res.data.plan.price);
      setNewDuration(res.data.plan.duration);
      setStartDate(parseISO(res.data.start_date));
      setEndDate(parseISO(res.data.end_date));

      setNewTotal(
        res.data.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      );

      setEditing(true);
    }

    async function loadStudents() {
      const res = await api.get('/students');

      const data = res.data.map(s => {
        return {
          id: s.id,
          title: s.name,
        };
      });
      setStudents(data);
    }

    async function loadPlans() {
      const res = await api.get('/plans');

      const data = res.data.map(p => {
        return {
          id: p.id,
          title: p.title,
          duration: p.duration,
          price: p.price,
        };
      });
      setPlans(data);
    }

    if (id) loadRegistration();

    loadStudents();
    loadPlans();
  }, [id, location.state]);

  /** SET NEW TOTAL ON CHANGE */
  useEffect(() => {
    setNewTotal(newDuration * newPrice);
  }, [newPrice, newDuration]);

  /** SET NEW END DATE */
  useEffect(() => {
    const newDate = addMonths(Date.parse(startDate), newDuration);

    setEndDate(newDate);
  }, [newDuration, startDate]);

  /** HANDLE SUBMIT */
  function handleSubmit() {
    if (!editing) {
      dispatch(addRegistrationRequest(student.id, plan.id, startDate));
    } else {
      dispatch(updateRegistrationRequest(id, student.id, plan.id, startDate));
    }
  }

  return (
    <Container>
      <Content>
        <Form
          initialData={{
            start_date: startDate,
            student,
            plan,
          }}
          onSubmit={handleSubmit}
        >
          <menu>
            <h1>{editing ? 'Edição de Matrícula' : 'Cadastro de Matrícula'}</h1>

            <div>
              <Link to="/registrations">
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
            <span>aluno</span>
            <ReactSelect
              name="student"
              options={students}
              value={student}
              onChange={e => {
                setStudent({
                  title: e.title,
                  id: e.id,
                });
              }}
            />
            <br />
            <span>plano</span>
            <ReactSelect
              name="plan"
              options={plans}
              value={plan}
              onChange={e => {
                setPlan({
                  title: e.title,
                  id: e.id,
                });
                setNewDuration(
                  plans.filter(option => option.id === e.id)[0].duration
                );
                setNewPrice(
                  plans.filter(option => option.id === e.id)[0].price
                );
              }}
            />
            <br />
            <div className="col-3">
              <div>
                <span>data de início</span>
                <br />

                <DatePicker
                  name="start_date"
                  onSelect={d => setStartDate(d)}
                  value={startDate}
                />
              </div>
              <div>
                <span>data de término</span>
                <br />
                <Input
                  type="date"
                  name="end_date"
                  disabled
                  value={format(Date.parse(endDate), 'yyyy-MM-dd', {
                    locale: pt,
                  })}
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

Registration.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
