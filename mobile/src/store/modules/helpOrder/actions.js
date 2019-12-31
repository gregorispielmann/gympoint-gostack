export function helpOrderRequest(id, question) {
  return {
    type: '@helpOrder/HELPORDER_REQUEST',
    payload: {
      id,
      question,
    },
  };
}

export function helpOrderSuccess() {
  return {
    type: '@helpOrder/HELPORDER_SUCCESS',
  };
}

export function helpOrderFailure() {
  return {
    type: '@helpOrder/HELPORDER_FAILURE',
  };
}
