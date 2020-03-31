import {combineReducers} from 'redux';
import {tasksReducer} from './branches/tasksBranch';
import {addTaskReducer} from './branches/addTaskBranch';
import {taskProgressReducer} from './branches/dataBranch';
import {setDateReducer} from './branches/setDateBranch';

export default combineReducers({
  tasksReducer,
  addTaskReducer,
  taskProgressReducer,
  setDateReducer,
});
