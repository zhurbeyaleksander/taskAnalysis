import {combineReducers} from 'redux';
import {tasksReducer} from './tasksBranch';
import {addTaskReducer} from './addTaskBranch';
import {taskProgressReducer} from './dataBranch';
import {setDateReducer} from './setDateBranch';

export default combineReducers({
  tasksReducer,
  addTaskReducer,
  taskProgressReducer,
  setDateReducer,
});
