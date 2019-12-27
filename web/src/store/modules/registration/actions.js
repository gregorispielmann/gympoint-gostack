export function addRegistrationRequest(student_id, plan_id, start_date) {
  return {
    type: '@registration/ADD_REGISTRATION_REQUEST',
    payload: {
      student_id,
      plan_id,
      start_date,
    },
  };
}

export function addRegistrationSuccess() {
  return {
    type: '@registration/ADD_REGISTRATION_SUCCESS',
  };
}

export function addRegistrationFailure() {
  return {
    type: '@registration/ADD_REGISTRATION_FAILURE',
  };
}

export function updateRegistrationRequest(id, student_id, plan_id, start_date) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: {
      id,
      student_id,
      plan_id,
      start_date,
    },
  };
}

export function updateRegistrationSuccess() {
  return {
    type: '@registration/UPDATE_REGISTRATION_SUCCESS',
  };
}

export function updateRegistrationFailure() {
  return {
    type: '@registration/UPDATE_REGISTRATION_FAILURE',
  };
}
