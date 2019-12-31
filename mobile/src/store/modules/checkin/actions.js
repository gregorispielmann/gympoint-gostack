export function checkInRequest(id) {
  return {
    type: '@checkin/CHECKIN_REQUEST',
    payload: {
      id,
    },
  };
}

export function checkInSuccess() {
  return {
    type: '@checkin/CHECKIN_SUCCESS',
  };
}

export function checkInFailure() {
  return {
    type: '@checkin/CHECKIN_FAILURE',
  };
}
