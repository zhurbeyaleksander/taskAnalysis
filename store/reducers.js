import {combineReducers} from 'redux';
import {tasksReducer} from './tasksBranch';

export default combineReducers({
  tasksReducer,
});
