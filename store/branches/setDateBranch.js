const SET_MONTH = 'SET_MONTH';
const RESET_MONTH = 'RESET_MONTH';
const SET_DAY = 'SET_DAY';
const RESET_DAY = 'RESET_DAY';

const initialState = {
  currentMonth: null,
  currentDay: null,
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

    case SET_DAY:
      return {
        ...state,
        currentDay: action.props.day,
      };

    case RESET_DAY:
      return {
        ...state,
        currentDay: null,
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

export function setCurrentDay(day) {
  return {
    type: SET_DAY,
    props: {
      day: day,
    },
  };
}

export function resetCurrentDay() {
  return {
    type: RESET_DAY,
    props: {
      day: null,
    },
  };
}
