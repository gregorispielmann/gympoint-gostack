import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content } from './styles';

import history from '~/services/history';

import api from '~/services/api';

import Button from '~/components/Button';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const res = await api.get(`students?q=${query}`);

      setStudents(res.data);
    }

    loadStudents();
  }, [query]);

  async function handleDelete(id, name) {
    if (window.confirm(`Deseja realmente excluir ${name}?`)) {
      try {
        const res = await api.delete(`students/${id}`);

        toast.success(`Aluno ${res.data.name} removido com sucesso!`);

        const studentData = await api.get(`students?q=${query}`);
        setStudents(studentData.data);
      } catch (e) {
        toast.error(
          'Erro ao remover aluno! Verifique se este aluno possui matrícula!'
        );
      }
    }
  }

  function handleEdit(id) {
    history.push('/student', {
      id,
    });
  }

  return (
    <Container>
      <Content>
        <menu>
          <h1>Gerenciamento de Alunos</h1>

          <div>
            <Link to="student">
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
                placeholder="Buscar aluno"
                onChange={t => setQuery(t.target.value)}
              />
            </div>
          </div>
        </menu>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Nome</th>
                <th style={{ width: '40%' }}>E-mail</th>
                <th className="age">Idade</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td className="age">{s.age}</td>
                    <td className="edit">
                      <button type="button" onClick={() => handleEdit(s.id)}>
                        editar
                      </button>
                    </td>
                    <td className="delete">
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id, s.name)}
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhum aluno encontrado!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Content>
    </Container>
  );
}
