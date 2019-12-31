import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/HELPORDER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@helpOrder/HELPORDER_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@helpOrder/HELPORDER_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
