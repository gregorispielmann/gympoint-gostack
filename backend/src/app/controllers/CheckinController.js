import { subDays } from 'date-fns';
import Sequelize from 'sequelize';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;
    const { Op } = Sequelize;

    const date = new Date();
    const oldDate = subDays(date, 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.gte]: oldDate,
          [Op.lte]: date,
        },
      },
    });

    if (checkins.length >= 5)
      return res.status(400).json({
        error: "You've already done checkin for 5 times this week",
      });

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
