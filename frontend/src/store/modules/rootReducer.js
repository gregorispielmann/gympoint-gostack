import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';
import plan from './plan/reducer';
import registration from './registration/reducer';

export default combineReducers({
  auth,
  student,
  plan,
  registration,
});
