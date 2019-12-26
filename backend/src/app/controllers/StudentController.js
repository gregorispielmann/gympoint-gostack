import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;

    if (q) {
      const students = await Student.findAll({
        order: [['id', 'DESC']],
        where: { name: { [Op.iLike]: `%${q}%` } },
      });

      return res.json(students);
    }

    const students = await Student.findAll({
      order: [['id', 'DESC']],
    });

    return res.json(students);
  }

  async show(req, res) {
    const student = await Student.findOne({ where: { id: req.params.id } });

    if (!student) res.status(400).json({ error: "Student doesn't exists" });

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists)
      res.status(400).json({ error: 'Student already exists' });

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      name: Yup.string(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const student = await Student.findByPk(req.params.id);

    const { email } = req.body;

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentExists)
        res.status(400).json({ error: 'E-mail already exists' });
    }

    const { id, name } = await student.update(req.body);

    return res.json(id, name, email);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    student.destroy();

    res.json(student);
  }
}

export default new StudentController();
