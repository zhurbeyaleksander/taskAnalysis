import {combineReducers} from 'redux';
import {tasksReducer} from './tasksBranch';
import {addTaskReducer} from './addTaskBranch';
import {taskProgressReducer} from './dataBranch';

export default combineReducers({
  tasksReducer,
  addTaskReducer,
  taskProgressReducer,
});
