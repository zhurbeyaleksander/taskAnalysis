import {dispatchStore} from '../../utils/StoreUtils';

const GET_TASKS_SUCCCESS = 'GET_TASKS_SUCCCESS';
const GET_TASKS_ERROR = 'GET_TASKS_ERROR';
const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
const RESET_PROPS = 'RESET_PROPS';

const initialState = {
  tasksList: [],
  error: null,
  needReload: false,
};

export function manageTaskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS_SUCCCESS:
      return {
        ...state,
        tasksList: action.props.data,
        needReload: false,
      };

    case GET_TASKS_ERROR:
      return {
        ...state,
        tasksList: [],
        needReload: false,
        error: action.props.error,
      };

    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        needReload: true,
      };

    case REMOVE_TASK_ERROR:
      return {
        ...state,
        needReload: false,
        error: action.props.error,
      };

    case RESET_PROPS:
      return {
        ...state,
        tasksList: [],
        error: null,
        needReload: false,
      };

    default:
      return state;
  }
}

const getTasksActionBuilder = {
  [`${getTasks.name}Success`]: result => {
    return {
      type: GET_TASKS_SUCCCESS,
      props: {
        data: result,
      },
    };
  },
  [`${getTasks.name}Error`]: error => {
    return {
      type: GET_TASKS_ERROR,
      props: {
        error: error,
      },
    };
  },
};

const removeTaskActionBuilder = {
  [`${removeTask.name}Success`]: () => {
    return {
      type: REMOVE_TASK_SUCCESS,
    };
  },
  [`${removeTask.name}Error`]: error => {
    return {
      type: REMOVE_TASK_ERROR,
      props: {
        error: error,
      },
    };
  },
};

export function getTasks() {
  return dispatch => {
    dispatchStore(dispatch, 'getAllKeys', '', {}, getTasks.name, getTasksActionBuilder);
  };
}

export function removeTask(key) {
  return dispatch => {
    dispatchStore(dispatch, 'removeData', key, {}, removeTask.name, removeTaskActionBuilder);
  };
}

export function resetProps() {
  return {
    type: RESET_PROPS,
  };
}
