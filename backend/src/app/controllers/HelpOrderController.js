import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { question } = req.body;

    const helpOrders = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
