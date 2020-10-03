import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import styles from "./index.module.scss";

function SearchBar({ cityName }) {
  return (
    <Flex className={styles.root}>
      <Flex className={styles.searchLeft}>
        <div className={styles.location}>
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div className={styles.searchForm}>
          <i className="iconfont icon-search"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i className="iconfont icon-map" />
    </Flex>
  );
}

SearchBar.propTypes = {
  cityName: PropTypes.string.isRequired,
};

export default SearchBar;
