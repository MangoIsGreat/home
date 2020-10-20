import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { WhiteSpace, WingBlank, Flex, Toast } from "antd-mobile";
import { setToken } from "../../utils/token";
import { Field, Form, withFormik, ErrorMessage } from "formik";
import { axios } from "../../utils/axios";
import * as Yup from "yup";

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
            <ErrorMessage
              component="div"
              className={styles.error}
              name="username"
            />
            <div className={styles.formItem}>
              <Field
                name="password"
                className={styles.input}
                placeholder="请输入密码"
                type="password"
              />
            </div>
            <ErrorMessage
              component="div"
              className={styles.error}
              name="password"
            />
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

const USERNAMEREG = /^[a-zA-Z_0-9]{5,8}$/;
const PASSWORDREG = /^[a-zA-Z_0-9]{5,12}$/;

export default withFormik({
  mapPropsToValues: () => ({ username: "test2", password: "test2" }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .matches(USERNAMEREG, "用户名必须是5-8位")
      .required("账号为必填项"),
    password: Yup.string()
      .matches(PASSWORDREG, "用户名必须是5-12位")
      .required("账号为必填项"),
  }),
  handleSubmit: async (values, { props }) => {
    const result = await axios.post("/user/login", values);

    if (result.data.status === 200) {
      // 保存token
      setToken(result.data.body.token);

      // 跳转，返回
      if (props.location.state) {
        props.history.replace(props.location.state.to);
      } else {
        props.history.goBack();
      }
    } else {
      Toast.info(result.data.description, 1.5);
    }
  },
})(Login);
