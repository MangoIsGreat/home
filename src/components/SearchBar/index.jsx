import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { withRouter } from "react-router-dom";
import styles from "./index.module.scss";
import classNames from "classnames"

function SearchBar({ cityName, history, className }) {
  return (
    <Flex className={classNames(styles.root, className)}>
      <Flex className={styles.searchLeft}>
        <div
          onClick={() => {
            history.push("/cityList");
          }}
          className={styles.location}
        >
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div className={styles.searchForm}>
          <i className="iconfont icon-search"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i onClick={() => {history.push("/map")}} className="iconfont icon-map" />
    </Flex>
  );
}

SearchBar.propTypes = {
  cityName: PropTypes.string.isRequired,
};

export default withRouter(SearchBar);
