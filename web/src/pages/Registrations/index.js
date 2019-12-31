import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content } from './styles';

import history from '~/services/history';

import api from '~/services/api';

import Button from '~/components/Button';

export default function Students() {
  const [registrations, setRegistrations] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadRegistrations() {
      const res = await api.get(`registrations?q=${query}`);

      setRegistrations(res.data);
    }

    loadRegistrations();
  }, [query]);

  async function handleDelete(id, name) {
    if (window.confirm(`Deseja realmente excluir a matrícula de ${name}?`)) {
      try {
        const res = await api.delete(`registrations/${id}`);

        toast.success(`Matrícula de ${name} removida com sucesso!`);

        const data = await api.get(`registrations?q=${query}`);
        setRegistrations(data.data);
      } catch (e) {
        toast.error('Erro ao remover o matrícula!');
      }
    }
  }

  function handleEdit(id) {
    history.push('/registration', {
      id,
    });
  }

  return (
    <Container>
      <Content>
        <menu>
          <h1>Gerenciamento de Matrículas</h1>

          <div>
            <Link to="registration">
              <Button type="button" color="#EE4D64">
                <MdAdd size={20} />
                <span />
                cadastrar
              </Button>
            </Link>
            <div className="search">
              <MdSearch size={20} className="icon" />
              <input
                type="text"
                size={30}
                id="name"
                placeholder="Buscar por aluno"
                onChange={t => setQuery(t.target.value)}
              />
            </div>
          </div>
        </menu>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Plano</th>
                <th>Início</th>
                <th>Término</th>
                <th>Ativa</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {registrations.length > 0 ? (
                registrations.map(r => (
                  <tr key={r.id}>
                    <td>{r.student.name}</td>
                    <td>{r.plan.title}</td>
                    <td>
                      {format(
                        new Date(r.start_date),
                        "dd 'de' MMMM 'de' yyyy",
                        {
                          locale: pt,
                        }
                      )}
                    </td>
                    <td>
                      {format(new Date(r.end_date), "dd 'de' MMMM 'de' yyyy", {
                        locale: pt,
                      })}
                    </td>
                    <td>
                      <MdCheckCircle
                        size={24}
                        color={r.active ? 'limegreen' : 'lightgray'}
                        style={{ verticalAlign: 'middle' }}
                      />
                    </td>
                    <td className="edit">
                      <button type="button" onClick={() => handleEdit(r.id)}>
                        editar
                      </button>
                    </td>
                    <td className="delete">
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id, r.student.name)}
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhuma matrícula encontrada!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Content>
    </Container>
  );
}
