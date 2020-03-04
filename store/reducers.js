import {combineReducers} from 'redux';
import {tasksReducer} from './tasksBranch';
import {addTaskReducer} from './addTaskBranch';

export default combineReducers({
  tasksReducer,
  addTaskReducer,
});
