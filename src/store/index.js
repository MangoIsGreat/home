import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// 导入根Reducer
import rootReducer from "./reducers";

// 使用了中间件时,还想在Google浏览器中看到数据
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
