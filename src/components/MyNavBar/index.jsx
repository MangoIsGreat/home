import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";
import classNames from "classnames";

function MyNavBar({ title, history, className, rightContent }) {
  return (
    <NavBar
      mode="light"
      className={classNames(className, styles.navBar)}
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => {
        history.goBack();
      }}
      rightContent={rightContent}
    >
      {title}
    </NavBar>
  );
}

MyNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  rightContent: PropTypes.array,
};

export default withRouter(MyNavBar);
