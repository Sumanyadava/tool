import changeTheNumber from "./addReducer";
import todoChanger from "./todoReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheNumber: changeTheNumber,
  todoChanger: todoChanger
});

export default rootReducer;
