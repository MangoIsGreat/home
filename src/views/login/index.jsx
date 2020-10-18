import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { WhiteSpace, WingBlank } from "antd-mobile";

import styles from "./index.module.scss";

export default class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <MyNavBar title="账号登录" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <form action="">
            <div className={styles.formItem}>
              <input
                className={styles.input}
                placeholder="请输入账号"
                type="text"
              />
            </div>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                placeholder="请输入密码"
                type="text"
              />
            </div>
            <div className={styles.formSubmit}>
              <input className={styles.submit} value="登录" type="submit" />
            </div>
          </form>
        </WingBlank>
      </div>
    );
  }
}
