import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import { BASE_URL } from "../../utils/url";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

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
      groups: null,
      news: null,
      cityName: "深圳"
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

    this.getGroupsData();

    this.getNewsData();
  }

  getSwipperData = async () => {
    const result = await this.axios.get("/home/swiper");

    if (result.data.status === 200) {
      this.setState({
        swipers: result.data.body,
      });
    }
  };

  getGroupsData = async () => {
    const result = await this.axios.get(
      "/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
    );

    if (result.data.status === 200) {
      this.setState({
        groups: result.data.body,
      });
    }
  };

  getNewsData = async () => {
    const result = await this.axios.get(
      "/home/news?area=AREA%7C88cff55c-aaa4-e2e0"
    );

    if (result.data.status === 200) {
      this.setState({
        news: result.data.body,
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

  renderGroups() {
    return (
      <div className={styles.groups}>
        <Flex justify="between">
          <Flex.Item style={{ fontSize: 18, fontWeight: "bold" }}>
            租房小组
          </Flex.Item>
          <Flex.Item align="end">更多</Flex.Item>
        </Flex>
        <Grid
          data={this.state.groups}
          columnNum={2}
          square={false}
          hasLine={false}
          renderItem={(item) => (
            <div className={styles.navItem}>
              <div className={styles.left}>
                <p>{item.title}</p>
                <p>{item.desc}</p>
              </div>
              <div className={styles.right}>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  renderNews() {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新资讯</h3>
        <WingBlank size="md">
          {this.state.news.map((item) => {
            return (
              <div key={item.id} className={styles.newsItem}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={`${BASE_URL}${item.imgSrc}`}
                    alt=""
                  />
                </div>
                <Flex
                  className={styles.content}
                  direction="column"
                  justify="between"
                >
                  <h3 className={styles.title}>{item.title}</h3>
                  <Flex className={styles.info} justify="between">
                    <p>{item.from}</p>
                    <p>{item.date}</p>
                  </Flex>
                </Flex>
              </div>
            );
          })}
        </WingBlank>
      </div>
    );
  }

  render() {
    const { swipers, groups, news } = this.state;

    return (
      <div className={styles.root}>
        <SearchBar cityName={this.state.cityName} />
        {/* 渲染轮播图 */}
        {swipers && this.renderSwiper()}
        {/* 首页导航菜单渲染 */}
        {this.renderNavs()}
        {/* 渲染租房小组 */}
        {groups && this.renderGroups()}
        {/* 渲染最新资讯 */}
        {news && this.renderNews()}
      </div>
    );
  }
}
