export function addStudentRequest(name, email, age, weight, height) {
  return {
    type: '@student/ADD_STUDENT_REQUEST',
    payload: {
      name,
      email,
      age,
      weight,
      height,
    },
  };
}

export function addStudentSuccess() {
  return {
    type: '@student/ADD_STUDENT_SUCCESS',
  };
}

export function addStudentFailure() {
  return {
    type: '@student/ADD_STUDENT_FAILURE',
  };
}

export function updateStudentRequest(id, name, email, age, weight, height) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: {
      id,
      name,
      email,
      age,
      weight,
      height,
    },
  };
}

export function updateStudentSuccess() {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}
