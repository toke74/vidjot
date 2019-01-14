import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import ideaReducer from "./ideaReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ideas: ideaReducer
});
