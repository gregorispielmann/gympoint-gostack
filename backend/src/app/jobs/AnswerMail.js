import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { studentName, studentEmail, question, answer, answer_at } = data;

    await Mail.sendMail({
      to: `${studentName} <${studentEmail}>`,
      subject: 'Sua pergunta foi respondida! - GymPoint',
      template: 'answer',
      context: {
        student: studentName,
        question,
        answer,
        answer_at: format(
          parseISO(answer_at),
          "dd 'de' MMMM 'de' yyyy 'às' H:mm'h'",
          {
            locale: ptBR,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
