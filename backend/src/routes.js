import { Router } from 'express';

// import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import CheckinController from './app/controllers/CheckinController';
import RegistrationController from './app/controllers/RegistrationController';
import PlanController from './app/controllers/PlanController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/** CREATE A NEW ADMIN USER */
// routes.post('/users', UserController.store);

/** CREATE A SESSION */
routes.post('/sessions', SessionController.store);
routes.get('/sessions/:id', SessionController.show);

/** CHECKIN */
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkin', CheckinController.store);

/** HELP ORDERS */
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

/** MIDDLEWARE TO AUTH CHECK */
routes.use(authMiddleware);

/** STUDENTS */
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

/** PLANS */
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/** REGISTRATIONS */
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

/** HELP ORDERS */
routes.get('/help-orders/', AnswerController.index);
routes.get('/help-orders/:id', AnswerController.show);
routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
