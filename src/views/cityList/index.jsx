import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { getCurrentCity } from "../../utils/city";
import { AutoSizer, List } from "react-virtualized";
import { setCity } from "../../utils/city";
import styles from "./index.module.scss";
import { Toast } from "antd-mobile";

// 标题的高度
const TITLEHEIGHT = 36;
// 每一行的高度
const ROWHEIGHT = 50;
// 有房源的城市
const HASRESOURCECITYS = ["北京", "上海", "广州", "深圳"];
export default class CityList extends Component {
  constructor() {
    super();

    this.state = {
      cityListObj: null,
      cityIndexList: null,
      selectIndex: 0,
    };
  }

  listRef = React.createRef();

  componentDidMount() {
    this.getCityData();
  }

  getCityData = async () => {
    const result = await this.axios.get("/area/city?level=1");

    this.dealWithCityData(result.data.body);
  };

  dealWithCityData = async (cityData) => {
    const tempObj = {};

    cityData.forEach((city) => {
      const letter = city.short.substr(0, 1);

      if (tempObj[letter]) {
        tempObj[letter].push(city);
      } else {
        tempObj[letter] = [city];
      }
    });

    const IndexObjectKeys = Object.keys(tempObj).sort();

    // 处理热门城市数据：
    const result = await this.axios.get("/area/hot");
    tempObj["hot"] = result.data.body;
    IndexObjectKeys.unshift("hot");

    // 处理定位城市数据：
    const currentCity = await getCurrentCity();
    tempObj["#"] = [currentCity];
    IndexObjectKeys.unshift("#");

    this.setState({
      cityListObj: tempObj,
      cityIndexList: IndexObjectKeys,
    });
  };

  formatTitle = (letter) => {
    switch (letter) {
      case "#":
        return "定位城市";
      case "hot":
        return "热门城市";
      default:
        return letter.toUpperCase();
    }
  };

  toggleCity = ({ label, value }) => {
    if (HASRESOURCECITYS.includes(label)) {
      // 保存到本地
      setCity({ label, value });

      // 返回首页
      this.props.history.goBack();
    } else {
      Toast.info("该城市暂无房源哦~", 1);
    }
  };

  calcRowHeight = ({ index }) => {
    const letter = this.state.cityIndexList[index];
    const list = this.state.cityListObj[letter];

    return TITLEHEIGHT + list.length * ROWHEIGHT;
  };

  rowRenderer = ({ key, index, style }) => {
    const letter = this.state.cityIndexList[index];
    const list = this.state.cityListObj[letter];

    return (
      <div key={key} style={style} className={styles.city}>
        {/* 渲染标题 */}
        <div className={styles.title}>{this.formatTitle(letter)}</div>
        {/* 渲染城市列表 */}
        {list.map((item) => {
          return (
            <div
              className={styles.name}
              key={item.value}
              onClick={() => this.toggleCity(item)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  onRowsRendered = ({ startIndex }) => {
    if (startIndex !== this.state.selectIndex) {
      this.setState({
        selectIndex: startIndex,
      });
    }
  };

  renderCityIndexList = () => {
    const { cityIndexList, selectIndex } = this.state;

    return (
      <div className={styles.cityIndex}>
        {cityIndexList.map((item, index) => {
          return (
            <div key={item} className={styles.cityIndexItem}>
              <span
                onClick={() => this.clickIndexList(index)}
                className={selectIndex === index ? styles.indexActive : ""}
              >
                {item === "hot" ? "热" : item.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  clickIndexList = (index) => {
    // 调用List的滚动方法：
    this.listRef.current.scrollToRow(index);
  };

  render() {
    const { cityListObj, cityIndexList } = this.state;

    return (
      <div className={styles.citylist}>
        <MyNavBar title="城市选择" />
        {/* 渲染列表 */}
        {cityListObj && (
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  ref={this.listRef}
                  width={width}
                  height={height}
                  rowCount={cityIndexList.length}
                  rowHeight={this.calcRowHeight}
                  rowRenderer={this.rowRenderer}
                  onRowsRendered={this.onRowsRendered}
                  scrollToAlignment="start"
                />
              );
            }}
          </AutoSizer>
        )}
        {/* 渲染索引 */}
        {cityIndexList && this.renderCityIndexList()}
      </div>
    );
  }
}
