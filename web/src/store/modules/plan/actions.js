export function addPlanRequest(title, duration, price) {
  return {
    type: '@plan/ADD_PLAN_REQUEST',
    payload: {
      title,
      duration,
      price,
    },
  };
}

export function addPlanSuccess() {
  return {
    type: '@plan/ADD_PLAN_SUCCESS',
  };
}

export function addPlanFailure() {
  return {
    type: '@plan/ADD_PLAN_FAILURE',
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: {
      id,
      title,
      duration,
      price,
    },
  };
}

export function updatePlanSuccess() {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}
