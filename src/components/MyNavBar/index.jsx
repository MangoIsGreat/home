import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";

function MyNavBar({ title, history }) {
  return (
    <NavBar
      mode="light"
      className={styles.navBar}
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => {
        history.goBack();
      }}
    >
      {title}
    </NavBar>
  );
}

MyNavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withRouter(MyNavBar);
