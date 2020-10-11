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
          this.addOverlays(this.id);
        } else {
          alert("您选择地址没有解析到结果!");
        }
      },
      cityName
    );
  };

  // 添加覆盖物
  addOverlays = async (id) => {
    Toast.loading("数据加载中...");
    const result = await this.axios.get(`/area/map?id=${id}`);
    Toast.hide();

    result.data.body.forEach((item) => {
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
          this.map.centerAndZoom(point, 13);

          // 请求二级覆盖物的数据
          Toast.loading("数据加载中...");
          this.axios.get(`/area/map?id=${value}`).then((res) => {
            Toast.hide();

            res.data.body.forEach((subItem) => {
              const {
                label: name1,
                value: value1,
                count: count1,
                coord: { latitude: latitude1, longitude: longitude1 },
              } = subItem;

              var point1 = new BMap.Point(longitude1, latitude1);

              var opts1 = {
                position: point1, // 指定文本标注所在的地理位置
                offset: new BMap.Size(30, -30), //设置文本偏移量
              };

              var label1 = new BMap.Label("", opts1); // 创建文本标注对象

              label1.setStyle(labelStyle);

              label1.setContent(`
                <div class=${styles.bubble}>
                  <p class=${styles.name}>${name1}</p>
                  <p class=${styles.name}>${count1}</p>
                </div>
              `);

              this.map.addOverlay(label1);
            });
          });
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

  render() {
    return (
      <div className={styles.map}>
        <MyNavBar title="地图找房" />
        <div id="container"></div>
      </div>
    );
  }
}
