import rootReducer from "../reducer/index";
import { legacy_createStore as createStore } from "redux";

const store = createStore(rootReducer)

export default store