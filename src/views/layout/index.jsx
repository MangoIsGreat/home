import React, {Component} from "react"
import {Switch, Route, Redirect, Link} from "react-router-dom"
import Home from '../home'
import HomeList from '../homeList'
import News from '../news'
import My from '../my'
import NotFound from '../NotFound'

import styles from "./index.module.scss"

export default class Layout extends Component {
    render() {
        return(
            <div>
                <div>
                    <Switch>
                        <Route path='/layout/index' component={Home} />
                        <Route path='/layout/homeList' component={HomeList} />
                        <Route path='/layout/news' component={News} />
                        <Route path='/layout/my' component={My} />
                        <Redirect exact from='/layout' to='/layout/index' />
                        <Route component={NotFound} />
                    </Switch>
                </div>

                <div>
                    <Link to='/layout/index'>首页</Link>
                    <Link to='/layout/homeList'>找房</Link>
                    <Link to='/layout/news'>咨询</Link>
                    <Link to='/layout/my'>我的</Link>
                </div>
            </div>
        )
    }
}