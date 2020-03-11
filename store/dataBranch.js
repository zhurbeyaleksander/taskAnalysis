import {getTaskProgress} from '../utils/TasksProgressUtils';

const GET_TASK_PROGRESS_LOADING = 'GET_TASK_PROGRESS';
const GET_TASK_PROGRESS_SUCCESS = 'GET_TASK_PROGRESS_SUCCESS';
const GET_TASK_PROGRESS_ERROR = 'GET_TASK_PROGRESS_ERROR';

const initialState = {
  isLoading: false,
  isDataGet: false,
  data: null,
  error: null,
};

export function taskProgressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_PROGRESS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TASK_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDataGet: true,
        data: action.props.data,
      };

    case GET_TASK_PROGRESS_ERROR:
      return {
        ...state,
        isLoading: false,
        isDataGet: false,
        error: action.props.error,
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
        data: result.data,
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
