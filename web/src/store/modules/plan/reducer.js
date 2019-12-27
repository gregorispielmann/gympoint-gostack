import produce from 'immer';

const INITIAL_STATE = {
  title: null,
  duration: null,
  price: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/ADD_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/ADD_PLAN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/ADD_PLAN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@plan/UPDATE_PLAN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/UPDATE_PLAN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/UPDATE_PLAN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
