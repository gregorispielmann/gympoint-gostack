import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container } from './styles';

import Button from '~/components/Button';

export default function Modal({ show, id, onClose }) {
  const [question, setQuestion] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    async function loadQuestion() {
      const res = await api.get(`help-orders/${id}`);

      setQuestion(res.data);
    }

    loadQuestion();
    setShowModal(show);
  }, [id, show]);

  async function handleAnswer() {
    if (answer.length === 0) {
      toast.error('Sua resposta não pode estar em branco!');
      return false;
    }

    try {
      await api.post(`/help-orders/${id}/answer`, {
        answer,
      });

      toast.success('Resposta postada com sucesso');
    } catch (e) {
      toast.error(e);
    }

    setShowModal(!showModal);
    onClose();
  }

  return !showModal ? null : (
    <Container>
      <div className="modal">
        <header>
          <button type="button" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </header>
        {question.map(q => (
          <div className="content" key={q.id}>
            <span className="title">PERGUNTA DE {q.student.name}</span>
            <br />
            <span className="question">{q.question}</span>
            <br />
          </div>
        ))}
        <div className="answer">
          <span className="title">SUA RESPOSTA</span>
          <br />
          <textarea name="answer" onKeyUp={e => setAnswer(e.target.value)} />
          <Button type="button" onClick={() => handleAnswer()} color="#EE4D64">
            Responder aluno
          </Button>
        </div>
      </div>
    </Container>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  id: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
