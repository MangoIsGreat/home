import React, { Component } from "react";
import { Button, Grid } from "antd-mobile";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

// 菜单数据
const menus = [
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/favorate" },
  { id: 2, name: "我的出租", iconfont: "icon-index", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record", to: "" },
  {
    id: 4,
    name: "成为房主",
    iconfont: "icon-identity",
    to: "",
  },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo", to: "" },
  { id: 6, name: "联系我们", iconfont: "icon-cust", to: "" },
];

export default class My extends Component {
  state = {
    avatar: "http://huangjiangjun.top:8088/img/profile/avatar.png",
    userName: "游客",
  };

  render() {
    const { avatar, userName } = this.state;

    return (
      <div className={styles.root}>
        {/* 用户信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src="http://huangjiangjun.top:8088/img/profile/bg.png"
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={avatar} alt="" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{userName}</div>
              <div className={styles.edit}>
                <Button
                  onClick={() => this.props.history.push("/login")}
                  inline
                  type="primary"
                  size="small"
                >
                  去登陆
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* 菜单信息 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          square={false}
          renderItem={(dataItem) => (
            <Link to={dataItem.to}>
              <div className={styles.menuItem}>
                <i className={`iconfont ${dataItem.iconfont}`} />
                <span>{dataItem.name}</span>
              </div>
            </Link>
          )}
        />
        {/* 底部广告 */}
        <div className={styles.ad}>
          <img
            src="http://huangjiangjun.top:8088/img/profile/join.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}
