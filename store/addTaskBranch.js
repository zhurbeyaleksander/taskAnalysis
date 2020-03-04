import {dispatchStore} from '../utils/StoreUtils';

const ADD_TASK_LOADING = 'ADD_TASK_LOADING';
const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
const ADD_TASK_ERROR = 'ADD_TASK_ERROR';

const initialState = {
  isLoading: false,
  isAddSuccess: false,
  error: null,
};

export function addTaskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAddSuccess: true,
      };

    case ADD_TASK_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

const addTaskActionBuilder = {
  [`${addTask.name}Loading`]: () => {
    return {
      type: ADD_TASK_LOADING,
    };
  },
  [`${addTask.name}Success`]: () => {
    return {
      type: ADD_TASK_SUCCESS,
    };
  },
  [`${addTask.name}Error`]: error => {
    return {
      type: ADD_TASK_ERROR,
    };
  },
};

export function addTask(taskData) {
  const {taskTitle} = taskData;

  return dispatch => {
    dispatchStore(dispatch, 'setData', taskTitle, taskData, addTask.name, addTaskActionBuilder);
  };
}
