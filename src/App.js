import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Layout from './views/layout'
import Login from './views/login'
import NotFound from './views/NotFound'

function App() {
    return ( <Router>
            <div>
                {/* 外层路由 */}
                <Switch>
                    <Route path = "/layout" component={Layout} />
                    <Route path = "/login" component={Login} />
                    {/* 重定向页面切记需使用exact */}
                    <Redirect exact from='/' to='/layout' />
                    {/* 未找到页面一定要放最后 */}
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;