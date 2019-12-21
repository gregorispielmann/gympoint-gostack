import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const {
      name,
      email,
      start_date,
      end_date,
      formattedPrice,
      title,
      plan_ext,
      duration,
    } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Bem-vindo(a) a GymPoint!',
      template: 'registration',
      context: {
        student: name,
        start_date: format(parseISO(start_date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
        end_date: format(parseISO(end_date), "dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
        price: formattedPrice,
        plan_title: title,
        plan_duration: duration,
        plan_ext,
      },
    });
  }
}

export default new RegistrationMail();
