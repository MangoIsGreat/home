import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { WhiteSpace, WingBlank, Flex, Toast } from "antd-mobile";
import { setToken } from "../../utils/token";

import styles from "./index.module.scss";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "test2",
      password: "test2",
    };
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async (e) => {
    e.preventDefault();

    const result = await this.axios.post("/user/login", this.state);

    if (result.data.status === 200) {
      //   保存token
      setToken(result.data.body.token);

      // 跳转，返回
      this.props.history.goBack();
    } else {
      Toast.info(result.data.description);
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className={styles.root}>
        <MyNavBar title="账号登录" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <form onSubmit={this.login}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={username}
                name="username"
                placeholder="请输入账号"
                type="text"
                onChange={this.changeValue}
              />
            </div>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={password}
                name="password"
                placeholder="请输入密码"
                type="text"
                onChange={this.changeValue}
              />
            </div>
            <div className={styles.formSubmit}>
              <input className={styles.submit} value="登录" type="submit" />
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <a href="#/">还没有账号，去注册~</a>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}
