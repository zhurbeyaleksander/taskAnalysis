const SET_MONTH = 'SET_MONTH';
const RESET_MONTH = 'RESET_MONTH';

const initialState = {
  currentMonth: null,
};

export function setDateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return {
        ...state,
        currentMonth: action.props.month,
      };

    case RESET_MONTH:
      return {
        ...state,
        currentMonth: null,
      };

    default:
      return state;
  }
}

export function setCurrentMonth(month) {
  return {
    type: SET_MONTH,
    props: {
      month: month,
    },
  };
}

export function resetCurrentMonth() {
  return {
    type: RESET_MONTH,
    props: {
      month: null,
    },
  };
}
