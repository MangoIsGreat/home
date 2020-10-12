import { createStore, applyMiddleware } from "redux";

// 导入根Reducer
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
