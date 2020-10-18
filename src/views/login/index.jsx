import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { WhiteSpace, WingBlank, Flex, Toast } from "antd-mobile";
import { setToken } from "../../utils/token";
import { Field, Form, withFormik } from "formik";
import { axios } from "../../utils/axios";

import styles from "./index.module.scss";

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <MyNavBar title="账号登录" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                name="username"
                className={styles.input}
                placeholder="请输入账号"
                type="text"
              />
            </div>
            <div className={styles.formItem}>
              <Field
                name="password"
                className={styles.input}
                placeholder="请输入密码"
                type="text"
              />
            </div>
            <div className={styles.formSubmit}>
              <input className={styles.submit} value="登录" type="submit" />
            </div>
          </Form>
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

export default withFormik({
  mapPropsToValues: () => ({ username: "", password: "" }),
  handleSubmit: async (values, { props }) => {
    const result = await axios.post("/user/login", values);

    if (result.data.status === 200) {
      // 保存token
      setToken(result.data.body.token);

      // 跳转，返回
      props.history.goBack();
    } else {
      Toast.info(result.data.description, 1.5);
    }
  },
})(Login);
