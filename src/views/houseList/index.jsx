import React, { Component } from "react";
import { Flex, Toast } from "antd-mobile";
import SearchBar from "../../components/SearchBar";
import { getCurrentCity } from "../../utils/city";
import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";
import Filter from "./components/Filter";
import Sticky from "../../components/Sticky";
import HouseItem from "../../components/HouseItem";
import { connect } from "react-redux";

import styles from "./index.module.scss";

class houseList extends Component {
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

  componentWillReceiveProps(props) {
    if (!props.isCanSearch) return;

    // 处理数据:
    // 处理area:
    if (props.area.length > 2) {
      const key = props.area[0];

      this.filters[key] =
        props.area[2] === "null" ? props.area[1] : props.area[2];
    } else {
      this.filters.area = null;
    }

    // 处理mode:
    if (props.mode[0] !== "null") {
      this.filters.rentType = props.mode[0];
    } else {
      this.filters.rentType = null;
    }

    // 处理price:
    if (props.price[0] !== "null") {
      this.filters.price = props.mode[0];
    } else {
      this.filters.price = null;
    }

    // 处理more:
    if (props.more.length > 0) {
      this.filters.more = props.more.join(",");
    } else {
      this.filters.more = null;
    }

    // 只有再点击确定的时候才执行getHouseListData
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
        <div key={index} style={style}>
          <p className={styles.loading}></p>
        </div>
      );
    }

    return <HouseItem key={key} style={style} {...item} />;
  };

  // 判断这一行是否加载完毕:
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  };

  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      Toast.loading("数据加载中...", 0);

      const result = await this.axios.get("/houses", {
        params: {
          ...this.filters,
          cityId: this.id,
          start: 1 + startIndex,
          end: 1 + stopIndex,
        },
      });

      Toast.hide();

      if (result.data.status === 200) {
        this.setState(
          {
            list: { ...this.state.list, ...result.data.body.list },
            count: result.data.body.count,
          },
          () => {
            // 这里代表网络请求发送完毕了,可以渲染数据了
            resolve();
          }
        );
      }
    });
  };

  renderHouseList = () => {
    const { count } = this.state;

    return (
      <div className={styles.houseList}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={count}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer>
                  {({ width }) => (
                    <List
                      autoHeight
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      height={height}
                      rowCount={count}
                      rowHeight={120}
                      rowRenderer={this.rowRenderer}
                      width={width}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
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
        <Sticky>
          <Filter />
        </Sticky>
        {/* 渲染房源列表 */}
        {this.state.list && this.renderHouseList()}
      </div>
    );
  }
}

const mapStateToProps = ({
  filters: {
    selectValue: { area, mode, price, more },
    isCanSearch,
  },
}) => {
  return {
    area,
    mode,
    price,
    more,
    isCanSearch,
  };
};

export default connect(mapStateToProps, null)(houseList);
