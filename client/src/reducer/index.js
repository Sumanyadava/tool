import { combineReducers } from "redux";
import changeTheNumber from "./addReducer";
import {shortTodoReducer,longTodoReducer} from "./todoReducer";
import { shortTaskReducer,longTaskReducer } from "./taskReducer";
import { editTaskShortReducer } from "./taskReducer";

const rootReducer = combineReducers({
  changeTheNumber: changeTheNumber,
  shortTodoReducer:shortTodoReducer,
  longTodoReducer:longTodoReducer,
  shortTaskReducer:shortTaskReducer,
  longTaskReducer:longTaskReducer,
  editTaskShortReducer:editTaskShortReducer,
});

export default rootReducer;
