import produce from 'immer';

const INITIAL_STATE = {
  student_id: null,
  plan_id: null,
  start_date: null,
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/ADD_REGISTRATION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/ADD_REGISTRATION_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@registration/ADD_REGISTRATION_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@registration/UPDATE_REGISTRATION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/UPDATE_REGISTRATION_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@registration/UPDATE_REGISTRATION_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
