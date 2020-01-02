import produce from 'immer';

const INITIAL_STATE = {
  show: false,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/ADD_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/ADD_STUDENT_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@student/ADD_STUDENT_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/UPDATE_STUDENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/UPDATE_STUDENT_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@student/UPDATE_STUDENT_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
