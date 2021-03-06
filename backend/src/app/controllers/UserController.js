import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = User.findOne({ where: { email: req.body.email } });

    if (userExists) res.status(400).json({ error: 'User already exists' });

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) res.status(400).json({ error: 'E-mail already exists' });
    }

    const { id, name } = await user.update(req.body);

    return res.json(id, name, email);
  }
}

export default new UserController();
