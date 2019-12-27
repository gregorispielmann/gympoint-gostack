import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import small_logo from '~/assets/small_logo.svg';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth.user);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="students">
          <img src={small_logo} alt="Gympoint" />
        </Link>
        <menu>
          <Link to="students">ALUNOS</Link>
          <Link to="plans">PLANOS</Link>
          <Link to="registrations">MATRÍCULAS</Link>
          <Link to="help-orders">PEDIDOS DE AUXÍLIO</Link>
        </menu>
      </nav>

      <aside>
        <strong>{name}</strong>
        <button type="button" onClick={() => handleLogout()}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
