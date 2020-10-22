import React, { Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import Layout from "./views/layout";
// import Login from "./views/login";
// import CityList from "./views/cityList";
// import Map from "./views/map";
// import Detail from "./views/detail";
// import Rent from "./views/rent";
// import RentAdd from "./views/rent/add";
// import RentSearch from "./views/rent/search";
// import NotFound from "./views/NotFound";
import "./App.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";

// 导入自己封装的路由组件
import AuthRoute from "./components/AuthRoute";

const Layout = React.lazy(() => import("./views/layout"));
const Login = React.lazy(() => import("./views/login"));
const CityList = React.lazy(() => import("./views/cityList"));
const Map = React.lazy(() => import("./views/map"));
const Detail = React.lazy(() => import("./views/detail"));
const Rent = React.lazy(() => import("./views/rent"));
const RentAdd = React.lazy(() => import("./views/rent/add"));
const RentSearch = React.lazy(() => import("./views/rent/search"));
const NotFound = React.lazy(() => import("./views/NotFound"));

function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        {/* 外层路由 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/layout" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="/cityList" component={CityList} />
            <Route path="/map" component={Map} />
            <Route path="/detail/:id" component={Detail} />
            <AuthRoute path="/rent" exact component={Rent} />
            <AuthRoute path="/rent/add" component={RentAdd} />
            <AuthRoute path="/rent/search" component={RentSearch} />
            {/* 重定向页面切记需使用exact */}
            <Redirect exact from="/" to="/layout" />
            {/* 未找到页面一定要放最后 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
