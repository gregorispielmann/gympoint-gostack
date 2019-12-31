import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/CHECKIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@checkin/CHECKIN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@checkin/CHECKIN_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
