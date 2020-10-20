import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./views/layout";
import Login from "./views/login";
import CityList from "./views/cityList";
import Map from "./views/map";
import Detail from "./views/detail";
import Rent from "./views/rent";
import NotFound from "./views/NotFound";
import { isLogin } from "./utils/token";
import "./App.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";

function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        {/* 外层路由 */}
        <Switch>
          <Route path="/layout" component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/cityList" component={CityList} />
          <Route path="/map" component={Map} />
          <Route path="/detail/:id" component={Detail} />
          <Route
            path="/rent"
            render={() => {
              // 逻辑处理
              if (isLogin()) {
                return <Rent />;
              } else {
                return (
                  <Redirect
                    to={{ pathname: "/login", state: { to: "/rent" } }}
                  />
                );
              }
            }}
          />
          {/* 重定向页面切记需使用exact */}
          <Redirect exact from="/" to="/layout" />
          {/* 未找到页面一定要放最后 */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
