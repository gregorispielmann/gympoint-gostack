import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const { page = 1, q } = req.query;

    if (q) {
      const registrations = await Registration.findAll({
        limit: 10,
        offset: (page - 1) * 10,
        order: ['created_at'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
            where: {
              name: { [Op.iLike]: `%${q}%` },
            },
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title', 'duration', 'price'],
          },
        ],
      });

      return res.json(registrations);
    }

    const registrations = await Registration.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registrations);
  }

  async show(req, res) {
    const registration = await Registration.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const { student_id, plan_id, start_date } = req.body;

    // Find the student data
    const student = await Student.findByPk(student_id);

    // check if student exists
    if (!student)
      return res.status(400).json({ error: "Student doesn't exists" });

    const { name, email } = student;

    // Find plans data
    const { duration, price, title } = await Plan.findByPk(plan_id);

    const finalPrice = price * duration;
    const end_date = addMonths(parseISO(start_date), duration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      price: finalPrice,
      start_date,
      end_date,
    });

    // Quando um aluno realiza uma matrícula ele recebe um e-mail com detalhes da sua inscrição na academia como plano, data de término, valor e uma mensagem de boas-vidas.

    const formattedPrice = finalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      precision: 2,
    });

    const plan_ext = duration === 1 ? 'mês' : 'meses';

    // SEND email
    await Queue.add(RegistrationMail.key, {
      student_id,
      name,
      email,
      start_date,
      end_date,
      formattedPrice,
      title,
      plan_ext,
      duration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      price: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const registration = await Registration.findByPk(id);

    const { duration, price } = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), duration);
    const finalPrice = price * duration;

    registration.student_id = student_id;
    registration.plan_id = plan_id;
    registration.price = finalPrice;
    registration.start_date = start_date;
    registration.end_date = end_date;

    await registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    try {
      await registration.destroy();
    } catch (e) {
      res.status(400).json(e.parent.code);
    }

    return res.json(registration);
  }
}

export default new RegistrationController();
