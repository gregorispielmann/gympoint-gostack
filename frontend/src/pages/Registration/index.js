import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import { format, addMonths, parseISO } from 'date-fns';
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
import AsyncReactSelect from '~/components/AsyncSelect';

export default function Registration({ location }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editing, setEditing] = useState(false);
  const [student, setStudent] = useState([]);
  const [plan, setPlan] = useState([]);
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
        value: res.data.student_id,
        label: res.data.student.name,
      });

      setStartDate(parseISO(res.data.start_date));

      setPlan({
        value: res.data.plan_id,
        label: res.data.plan.title,
      });

      setNewDuration(res.data.plan.duration);
      setNewPrice(res.data.plan.price);

      setEditing(true);
    }

    async function loadPlans() {
      const res = await api.get('/plans');

      const data = res.data.map(p => {
        return {
          value: p.id,
          label: p.title,
          duration: p.duration,
          price: p.price,
        };
      });
      setPlans(data);
    }

    if (id) loadRegistration();

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
      dispatch(addRegistrationRequest(student.value, plan.value, startDate));
    } else {
      dispatch(
        updateRegistrationRequest(id, student.value, plan.value, startDate)
      );
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
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
            <AsyncReactSelect
              name="student"
              label="aluno"
              defaultValue={student}
              onChange={s => setStudent(s)}
            />
            <br />
            <ReactSelect
              name="plan"
              label="plano"
              defaultValue={plan}
              options={plans}
              onChange={e => {
                setPlan(e);
                setNewDuration(e.duration);
                setNewPrice(e.price);
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
