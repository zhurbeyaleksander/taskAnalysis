import {getTaskProgress} from '../utils/TasksProgressUtils';

const GET_TASK_PROGRESS_LOADING = 'GET_TASK_PROGRESS_LOADING';
const GET_TASK_PROGRESS_SUCCESS = 'GET_TASK_PROGRESS_SUCCESS';
const GET_TASK_PROGRESS_ERROR = 'GET_TASK_PROGRESS_ERROR';
const RESET_PROPS = 'RESET_PROPS';

const initialState = {
  isLoadingData: false,
  isDataGet: false,
  data: {},
  error: null,
};

export function taskProgressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_PROGRESS_LOADING:
      return {
        ...state,
        isLoadingData: true,
      };

    case GET_TASK_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoadingData: false,
        isDataGet: true,
        data: action.props.data,
      };

    case GET_TASK_PROGRESS_ERROR:
      return {
        ...state,
        isLoadingData: false,
        isDataGet: false,
        error: action.props.error,
      };

    case RESET_PROPS:
      return {
        isLoadingData: false,
        isDataGet: false,
        data: {},
        error: null,
      };

    default:
      return state;
  }
}

const getDataActionBuilder = {
  [`${getData.name}Loading`]: () => {
    return {
      type: GET_TASK_PROGRESS_LOADING,
    };
  },
  [`${getData.name}Success`]: result => {
    return {
      type: GET_TASK_PROGRESS_SUCCESS,
      props: {
        data: result,
      },
    };
  },
  [`${getData.name}Error`]: error => {
    return {
      type: GET_TASK_PROGRESS_ERROR,
      props: {
        error: error,
      },
    };
  },
};

export function getData(period, data) {
  return dispatch => {
    getTaskProgress(dispatch, period, data, getData.name, getDataActionBuilder);
  };
}

export function resetProps() {
  return {
    type: RESET_PROPS,
  };
}
