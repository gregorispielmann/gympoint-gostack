import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) res.status(401).json({ error: 'User not found' });

    if (!(await user.checkPassword(password)))
      res.status(401).json({ error: 'Wrong password' });

    /** IN CASE USER EXISTS AND PASSWORD IS CORRECT */
    const { id, name } = user;

    /** RETURN JSON WITH INFO AND TOKEN */
    return res.json({
      user: {
        id,
        name,
        email,
      },

      /** JWT STRUCTURE (HEADER, PAYLOAD, SIGNATURE) */
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
