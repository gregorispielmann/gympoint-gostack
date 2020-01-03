import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content } from './styles';

import history from '~/services/history';
import api from '~/services/api';

import Button from '~/components/Button';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const res = await api.get(`plans`);

      setPlans(res.data);
    }

    loadPlans();
  }, []);

  async function handleDelete(id, title) {
    if (window.confirm(`Deseja realmente excluir ${title}?`)) {
      try {
        const data = await api.delete(`plans/${id}`);
        toast.success(`Plano ${data.data.title} removido com sucesso!`);

        const res = await api.get(`plans`);
        setPlans(res.data);
      } catch (e) {
        toast.error(
          'Erro ao remover o plano! Verifique se não há matrículas com este plano'
        );
      }
    }
  }

  function handleEdit(id) {
    history.push('/plan', {
      id,
    });
  }

  return (
    <Container>
      <Content>
        <menu>
          <h1>Gerenciamento de Planos</h1>

          <div>
            <Link to="plan">
              <Button type="button" color="#EE4D64">
                <MdAdd size={20} />
                <span />
                cadastrar
              </Button>
            </Link>
          </div>
        </menu>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th className="title">Título</th>
                <th className="duration">duração</th>
                <th className="price">valor mensal</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {plans.length > 0 ? (
                plans.map(p => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td className="duration">
                      {p.duration === 1 ? '1 mês' : `${p.duration} meses`}
                    </td>
                    <td className="price">
                      {p.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td className="edit">
                      <button type="button" onClick={() => handleEdit(p.id)}>
                        editar
                      </button>
                    </td>
                    <td className="delete">
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhum plano encontrado!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Content>
    </Container>
  );
}
