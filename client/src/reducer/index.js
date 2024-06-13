import { combineReducers } from "redux";
import changeTheNumber from "./addReducer";
import {shortTodoReducer,longTodoReducer} from "./todoReducer";
import { shortTaskReducer,longTaskReducer } from "./taskReducer";

const rootReducer = combineReducers({
  changeTheNumber: changeTheNumber,
  shortTodoReducer:shortTodoReducer,
  longTodoReducer:longTodoReducer,
  shortTaskReducer:shortTaskReducer,
  longTaskReducer:longTaskReducer,
});

export default rootReducer;
