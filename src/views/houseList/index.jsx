import React, { Component } from "react";
import { Flex, Toast } from "antd-mobile";
import SearchBar from "../../components/SearchBar";
import { getCurrentCity } from "../../utils/city";
import { AutoSizer, List } from "react-virtualized";
import Filter from "./components/Filter";
import HouseItem from "../../components/HouseItem";

import styles from "./index.module.scss";

export default class houseList extends Component {
  constructor() {
    super();

    this.state = {
      cityName: "深圳",
      list: null, // 房源列表的数据
      count: 0, // 根据条件查询出的,满足要求的房源总数
    };
  }

  id = null; // 城市id
  filters = {}; // 查询时候的筛选条件

  async componentDidMount() {
    const result = await getCurrentCity();

    // 获取城市id
    this.id = result.value;

    this.setState({
      cityName: result.label,
    });

    // 调用获取房源列表数据的方法
    this.getHouseListData();
  }

  getHouseListData = async () => {
    Toast.loading("数据加载中...", 0);

    const result = await this.axios.get("/houses", {
      params: {
        ...this.filters,
        cityId: this.id,
        start: 1,
        end: 20,
      },
    });

    Toast.hide();

    if (result.data.status === 200) {
      this.setState({
        list: result.data.body.list,
        count: result.data.body.count,
      });
    }
  };

  rowRenderer = ({ key, index, style }) => {
    const item = this.state.list[index];

    if (!item) {
      return (
        <div style={style}>
          <p className={styles.loading}></p>
        </div>
      );
    }

    return <HouseItem key={key} style={style} {...item} />;
  };

  renderHouseList = () => {
    const { count } = this.state;

    return (
      <div className={styles.houseList}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={count}
              rowHeight={120}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  };

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
        <Filter />
        {/* 渲染房源列表 */}
        {this.state.list && this.renderHouseList()}
      </div>
    );
  }
}
