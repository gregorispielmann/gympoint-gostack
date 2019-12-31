export function signInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      id,
    },
  };
}

export function signInSuccess(id, signed) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      id,
      signed,
    },
  };
}

export function signInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
