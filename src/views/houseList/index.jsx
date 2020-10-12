import React, { Component } from "react";
import { Flex } from "antd-mobile";
import SearchBar from "../../components/SearchBar";
import { getCurrentCity } from "../../utils/city";

import styles from "./index.module.scss";

export default class houseList extends Component {
  constructor() {
    super();

    this.state = {
      cityName: "深圳",
    };
  }

  async componentDidMount() {
    const result = await getCurrentCity();
    this.setState({
      cityName: result.label,
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i className="iconfont icon-back" />
          <SearchBar
            cityName={this.state.cityName}
            className={styles.mySearchBar}
          />
        </Flex>
      </div>
    );
  }
}
