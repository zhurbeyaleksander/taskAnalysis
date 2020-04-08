import {dispatchStore} from '../../utils/StoreUtils';

const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCCESS';
const GET_TASKS_ERROR = 'GET_TASKS_ERROR';
const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
const GET_TASK_ERROR = 'GET_TASK_ERROR';
const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
const EDIT_TASK_ERROR = 'EDIT_TASK_ERROR';
const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
const RESET_PROPS = 'RESET_PROPS';

const initialState = {
  tasksList: [],
  editTask: null,
  isEdit: false,
  error: null,
  needReload: false,
};

export function manageTaskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS_SUCCESS:
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

    case GET_TASK_SUCCESS:
      return {
        ...state,
        editTask: action.props.data,
      };

    case GET_TASK_ERROR:
      return {
        ...state,
        editTask: null,
        error: action.props.error,
      };

    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        isEdit: true,
      };

    case EDIT_TASK_ERROR:
      return {
        ...state,
        isEdit: false,
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
        error: null,
        needReload: false,
        editTask: null,
        isEdit: false,
      };

    default:
      return state;
  }
}

const getTasksActionBuilder = {
  [`${getTasks.name}Success`]: result => {
    return {
      type: GET_TASKS_SUCCESS,
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

const getTaskActionBuilder = {
  [`${getTask.name}Success`]: result => {
    return {
      type: GET_TASK_SUCCESS,
      props: {
        data: result,
      },
    };
  },
  [`${getTask.name}Error`]: error => {
    return {
      type: GET_TASK_ERROR,
      props: {
        error: error,
      },
    };
  },
};

const editTaskActionBuilder = {
  [`${editTask.name}Success`]: () => {
    return {
      type: EDIT_TASK_SUCCESS,
    };
  },
  [`${editTask.name}Error`]: error => {
    return {
      type: EDIT_TASK_ERROR,
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

export function getTask(key) {
  return dispatch => {
    dispatchStore(dispatch, 'getData', key, {}, getTask.name, getTaskActionBuilder);
  };
}

export function editTask(data, key) {
  return dispatch => {
    dispatchStore(dispatch, 'mergeData', key, data, editTask.name, editTaskActionBuilder);
  };
}

export function resetProps() {
  return {
    type: RESET_PROPS,
  };
}
