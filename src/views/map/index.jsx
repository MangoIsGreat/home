import React, { Component } from "react";
import styles from "./index.module.scss";
import MyNavBar from "../../components/MyNavBar";
import { Toast } from "antd-mobile";
import { getCurrentCity } from "../../utils/city.js";

const BMap = window.BMap;

// 圆形覆盖物的样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};

export default class Map extends Component {
  async componentDidMount() {
    const city = await getCurrentCity();
    this.id = city.value;

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

          // 添加覆盖物
          this.renderOverlays(this.id);
        } else {
          alert("您选择地址没有解析到结果!");
        }
      },
      cityName
    );
  };

  getTypeAndNextZoom = () => {
    let type = "circle";
    let nextZoom = 13;
    let zoom = this.map.getZoom();

    if (zoom >= 10 && zoom <= 12) {
      type = "circle";
      nextZoom = 13;
    } else if (zoom >= 13 && zoom <= 14) {
      type = "circle";
      nextZoom = 15;
    } else if (zoom > 14) {
      type = "rect";
    }

    return { type, nextZoom };
  };

  renderCircleOverlay = (originData, nextZoom) => {
    originData.data.body.forEach((item) => {
      const {
        label: name,
        value,
        count,
        coord: { latitude, longitude },
      } = item;

      var point = new BMap.Point(longitude, latitude);

      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(30, -30), //设置文本偏移量
      };

      var label = new BMap.Label("", opts); // 创建文本标注对象

      label.setStyle(labelStyle);

      label.addEventListener("click", () => {
        setTimeout(() => {
          // 清空一级覆盖物
          this.map.clearOverlays();

          // 重新设置中心点和缩放级别
          this.map.centerAndZoom(point, nextZoom);

          this.renderOverlays(value);
        }, 0);
      });

      label.setContent(`
      <div class=${styles.bubble}>
        <p class=${styles.name}>${name}</p>
        <p class=${styles.name}>${count}</p>
      </div>
    `);

      this.map.addOverlay(label);
    });
  };

  renderRectOverlay = () => {};

  // 添加覆盖物
  renderOverlays = async (id) => {
    Toast.loading("数据加载中...");
    const result = await this.axios.get(`/area/map?id=${id}`);
    Toast.hide();

    const { type, nextZoom } = this.getTypeAndNextZoom();

    if (type === "circle") {
      this.renderCircleOverlay(result, nextZoom);
    } else {
      this.renderRectOverlay();
    }
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
