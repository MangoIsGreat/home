import { combineReducers } from "redux";

// 导入子reducer
import filters from "./filters";

// 合并各子Reducer并且导出
export default combineReducers({
  filters,
});
