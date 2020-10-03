import React, { Component } from "react";
import { Carousel, Flex } from "antd-mobile";
import { BASE_URL } from "../../utils/url";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

import image1 from "../../assets/images/nav-1.png";
import image2 from "../../assets/images/nav-2.png";
import image3 from "../../assets/images/nav-3.png";
import image4 from "../../assets/images/nav-4.png";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      swipers: null,
    };
  }

  //   定义的实例属性
  navs = [
    { icon: image1, text: "整租", path: "/layout/houselist" },
    { icon: image2, text: "合租", path: "/layout/houselist" },
    { icon: image3, text: "地图找房", path: "/map" },
    { icon: image4, text: "去出租", path: "/rent/add" },
  ];

  componentDidMount() {
    this.getSwipperData();
  }

  getSwipperData = async () => {
    const result = await this.axios.get("/home/swiper");

    if (result.data.status === 200) {
      this.setState({
        swipers: result.data.body,
      });
    }
  };

  renderSwiper = () => {
    return (
      <Carousel autoplay={true} infinite>
        {this.state.swipers.map((item) => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{ display: "inline-block", width: "100%", height: 212 }}
          >
            <img
              src={`${BASE_URL}${item.imgSrc}`}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  };

  renderNavs() {
    return (
      <Flex className={styles.nav}>
        {this.navs.map((item) => {
          return (
            <Flex.Item>
              <Link to={item.path}>
                <img src={item.icon} alt="" />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          );
        })}
      </Flex>
    );
  }

  render() {
    const { swipers } = this.state;

    return (
      <div className={styles.root}>
        {/* 渲染轮播图 */}
        {swipers && this.renderSwiper()}
        {/* 首页导航菜单渲染 */}
        {this.renderNavs()}
      </div>
    );
  }
}
