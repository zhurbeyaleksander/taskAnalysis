import {
  getTaskProgress,
  getTaskListInDate,
  addCheckToStorage,
} from '../../utils/TasksProgressUtils';

const GET_TASK_PROGRESS_LOADING = 'GET_TASK_PROGRESS_LOADING';
const GET_TASK_PROGRESS_SUCCESS = 'GET_TASK_PROGRESS_SUCCESS';
const GET_TASK_PROGRESS_ERROR = 'GET_TASK_PROGRESS_ERROR';
const GET_TASKLIST_INDATE_LOADING = 'GET_TASKLIST_INDATE_LOADING';
const GET_TASKLIST_INDATE_SUCCESS = 'GET_TASKLIST_INDATE_SUCCESS';
const GET_TASKLIST_INDATE_ERROR = 'GET_TASKLIST_INDATE_ERROR';
const ADD_CHECK_LOADING = 'ADD_CHECK_LOADING';
const ADD_CHECK_SUCCESS = 'ADD_CHECK_SUCCESS';
const ADD_CHECK_ERROR = 'ADD_CHECK_ERROR';
const NEED_RELOAD_TASKS_LIST = 'NEED_RELOAD_TASK_LIST';
const RESET_PROPS = 'RESET_PROPS';

const initialState = {
  isLoadingData: false,
  isLoadingCheck: false,
  isDataGet: false,
  needReload: false,
  data: {},
  taskListIndate: [],
  isLoadingTaskListInDate: false,
  error: null,
};

export function taskProgressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_PROGRESS_LOADING:
      return {
        ...state,
        isLoadingData: true,
      };

    case GET_TASKLIST_INDATE_LOADING:
      return {
        ...state,
        isLoadingTaskListInDate: true,
      };

    case ADD_CHECK_LOADING:
      return {
        ...state,
        isLoadingCheck: true,
      };

    case GET_TASK_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoadingData: false,
        isDataGet: true,
        data: action.props.data,
      };

    case ADD_CHECK_SUCCESS:
      return {
        ...state,
        isLoadingCheck: false,
        needReload: true,
      };

    case GET_TASKLIST_INDATE_SUCCESS:
      return {
        ...state,
        isLoadingTaskListInDate: false,
        needReload: false,
        taskListIndate: action.props.data,
      };

    case GET_TASK_PROGRESS_ERROR:
      return {
        ...state,
        isLoadingTaskListInDate: false,
        error: action.props.error,
      };

    case GET_TASK_PROGRESS_ERROR:
      return {
        ...state,
        isLoadingData: false,
        isDataGet: false,
        error: action.props.error,
      };

    case ADD_CHECK_ERROR:
      return {
        ...state,
        isLoadingCheck: false,
        needReload: false,
        error: action.props.error,
      };

    case NEED_RELOAD_TASKS_LIST:
      return {
        ...state,
        needReload: true,
      };

    case RESET_PROPS:
      return {
        ...state,
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

const getTaskListActionBuilder = {
  [`${getTaskList.name}Loading`]: () => {
    return {
      type: GET_TASKLIST_INDATE_LOADING,
    };
  },
  [`${getTaskList.name}Success`]: result => {
    return {
      type: GET_TASKLIST_INDATE_SUCCESS,
      props: {
        data: result,
      },
    };
  },
  [`${getTaskList.name}Error`]: error => {
    return {
      type: GET_TASKLIST_INDATE_ERROR,
      props: {
        error: error,
      },
    };
  },
};

const addCheckActionBuilder = {
  [`${addCheck.name}Loading`]: () => {
    return {
      type: ADD_CHECK_LOADING,
    };
  },
  [`${addCheck.name}Success`]: () => {
    return {
      type: ADD_CHECK_SUCCESS,
    };
  },
  [`${addCheck.name}Error`]: error => {
    return {
      type: ADD_CHECK_ERROR,
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

export function getTaskList(day) {
  return dispatch => {
    getTaskListInDate(dispatch, day, getTaskList.name, getTaskListActionBuilder);
  };
}

export function addCheck(key, date) {
  return dispatch => {
    addCheckToStorage(dispatch, key, date, addCheck.name, addCheckActionBuilder);
  };
}

export function resetProps() {
  return {
    type: RESET_PROPS,
  };
}

export function needReloadTasksList() {
  return {
    type: NEED_RELOAD_TASKS_LIST,
  };
}
