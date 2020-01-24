import {dispatchStore} from '../utils/StoreUtils';

const GET_DATA_LOADING = 'GET_DATA_LOADING';
const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
const GET_DATA_ERROR = 'GET_DATA_ERROR';

const initialState = {
  yearData: null,
  isLoading: false,
};

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        yearData: action.payload,
      };

    case GET_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
