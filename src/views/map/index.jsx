import React, { Component } from "react";
import styles from "./index.module.scss";
import MyNavBar from "../../components/MyNavBar";
import { getCurrentCity } from "../../utils/city.js";

const BMap = window.BMap;

export default class Map extends Component {
  async componentDidMount() {
    const city = await getCurrentCity();

    this.initMap(city.label);
  }

  initMap = (cityName) => {
    this.map = new BMap.Map("container");
    // 创建地址解析实例：
    var myGeo = new BMap.Geocoder();

    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(
      cityName,
      (point) => {
        if (point) {
          this.map.centerAndZoom(point, 11);
        } else {
          alert("您选择地址没有解析到结果!");
        }
      },
      cityName
    );
  };

  render() {
    return (
      <div className={styles.map}>
        <MyNavBar title="地图找房" />
        <div id="container"></div>
      </div>
    );
  }
}
