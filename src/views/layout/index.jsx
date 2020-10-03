import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home";
import HomeList from "../homeList";
import News from "../news";
import My from "../my";
import NotFound from "../NotFound";
import { TabBar } from "antd-mobile";

import styles from "./index.module.scss";

export default class Layout extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedPath: props.location.pathname
    };
  }

  TABS = [
    {
      title: "首页",
      icon: "icon-index",
      path: "/layout/index",
    },
    {
      title: "找房",
      icon: "icon-findHouse",
      path: "/layout/houselist",
    },
    {
      title: "资讯",
      icon: "icon-info",
      path: "/layout/news",
    },
    {
      title: "我的",
      icon: "icon-my",
      path: "/layout/my",
    },
  ];

  renderTabBar = () => {
    return (
      <TabBar tintColor="#21B97A" noRenderContent={true}>
        {this.TABS.map((item) => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`} />}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectedPath === item.path}
              onPress={() => {
                  this.setState({
                    selectedPath: item.path
                  })

                  if (this.state.selectedPath !== item.path) {
                    this.props.history.push(item.path)
                  }
              }}
            ></TabBar.Item>
          );
        })}
      </TabBar>
    );
  };

  render() {
    return (
      <div className={styles.layout}>
        <div>
          <Switch>
            <Route path="/layout/index" component={Home} />
            <Route path="/layout/homeList" component={HomeList} />
            <Route path="/layout/news" component={News} />
            <Route path="/layout/my" component={My} />
            <Redirect exact from="/layout" to="/layout/index" />
            <Route component={NotFound} />
          </Switch>
        </div>

        {/* TabBar */}
        {this.renderTabBar()}
      </div>
    );
  }
}
