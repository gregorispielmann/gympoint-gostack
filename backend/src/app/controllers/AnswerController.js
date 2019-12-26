import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null, id: req.params.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { answer } = req.body;
    const answer_at = new Date();

    const helpOrder = await HelpOrder.update(
      {
        answer,
        answer_at,
      },
      {
        where: { id },
      }
    );

    const helpOrderData = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Quando um pedido de auxílio for respondido, o aluno deve receber um e-mail da plataforma com a pergunta e resposta da academia;

    const studentName = helpOrderData.student.name;
    const studentEmail = helpOrderData.student.email;
    const { question } = helpOrderData;

    // SEND email
    await Queue.add(AnswerMail.key, {
      studentName,
      studentEmail,
      question,
      answer,
      answer_at,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
