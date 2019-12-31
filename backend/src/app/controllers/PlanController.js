import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const plan = await Plan.findOne({ where: { id: req.params.id } });

    if (!plan) res.status(400).json({ error: "Plan doesn't exists" });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const { title, duration, price } = req.body;

    const plans = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plans);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    const { title, duration, price } = req.body;

    plan.price = price;
    plan.title = title;
    plan.duration = duration;

    plan.save();

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    try {
      await plan.destroy();
    } catch (e) {
      res.status(400).json(e.parent.code);
    }

    return res.json(plan);
  }
}

export default new PlansController();
