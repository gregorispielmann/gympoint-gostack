import React, { useEffect, useState } from 'react';

import { Container, Content } from './styles';

import api from '~/services/api';

import Modal from '~/components/Modal';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    async function loadHelpOrders() {
      const res = await api.get('help-orders');

      setHelpOrders(res.data);
    }

    loadHelpOrders();
  }, [isOpen]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Modal show={isOpen} onClose={toggleModal} id={id} />
      <Container>
        <Content>
          <menu>
            <h1>Pedidos de Auxílio</h1>
          </menu>

          <div className="content">
            <table>
              <thead>
                <tr>
                  <th className="title">Aluno</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {helpOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum pedido encontrado!</td>
                  </tr>
                ) : (
                  helpOrders.map(h => (
                    <tr key={h.id}>
                      <td>{h.student.name}</td>
                      <td className="edit">
                        <button
                          type="button"
                          onClick={() => {
                            toggleModal();
                            setId(h.id);
                          }}
                        >
                          responder
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Content>
      </Container>
    </>
  );
}
