import React, { Component } from "react";
import styles from "./index.module.scss";
import MyNavBar from "../../components/MyNavBar";
import HouseMatch from "../../components/HouseMatch";
import { Carousel, Flex } from "antd-mobile";
import { BASE_URL } from "../../utils/url";

const BMapGL = window.BMapGL;
const labelStyle = {
  position: "absolute",
  zIndex: -1,
  backgroundColor: "rgb(238, 93, 91)",
  color: "rgb(255, 255, 255)",
  height: 25,
  padding: "5px 10px",
  lineHeight: "14px",
  borderRadius: 3,
  boxShadow: "rgb(204, 204, 204) 2px 2px 2px",
  whiteSpace: "nowrap",
  fontSize: 12,
  userSelect: "none",
};

export default class Detail extends Component {
  constructor() {
    super();

    this.state = {
      detail: {},
      imgHeight: 252,
    };
  }

  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = async () => {
    const result = await this.axios.get(
      `/houses/${this.props.match.params.id}`
    );

    if (result.data.status === 200) {
      this.setState(
        {
          detail: result.data.body,
        },
        () => {
          setTimeout(() => {
            this.initMap();
          }, 0);
        }
      );
    }
  };

  renderSwiper = () => {
    const { houseImg } = this.state.detail;
    return (
      <Carousel autoplay={false} infinite>
        {houseImg.map((val) => (
          <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: "inline-block",
              width: "100%",
              height: this.state.imgHeight,
            }}
          >
            <img
              src={`${BASE_URL}${val}`}
              alt=""
              style={{ width: "100%", height: "100%", verticalAlign: "top" }}
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

  /**
   * 渲染房屋信息
   */
  renderHouseInfo = () => {
    const {
      detail: { title, tags, price, roomType, size, floor, oriented },
    } = this.state;
    return (
      <div className={styles.info}>
        <h3 className={styles.infoTitle}>{title}</h3>
        <Flex>
          {tags &&
            tags.map((item, index) => {
              const tagName = `tag${(index % 3) + 1}`;
              return (
                <span
                  key={index}
                  className={[styles.tag, styles[tagName]].join(" ")}
                >
                  {item}
                </span>
              );
            })}
        </Flex>
        <Flex className={styles.infoPrice}>
          <Flex.Item className={styles.infoPriceItem}>
            <div>
              {price}
              <span className={styles.month}>/月</span>
            </div>
            <div>租金</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{roomType}</div>
            <div>房型</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{size}</div>
            <div>面积</div>
          </Flex.Item>
        </Flex>
        <Flex className={styles.infoBasic} align="center">
          <Flex.Item>
            <div>
              <span className={styles.title}>装修：</span>
              精装修
            </div>
            <div>
              <span className={styles.title}>楼层：</span>
              {floor}
            </div>
          </Flex.Item>
          <Flex.Item>
            <div>
              <span className={styles.title}>朝向：</span>
              {oriented && oriented.join(" ")}
            </div>
            <div>
              <span className={styles.title}>类型：</span>普通住宅
            </div>
          </Flex.Item>
        </Flex>
      </div>
    );
  };

  renderMap = () => {
    const { community } = this.state.detail;

    return (
      <div className={styles.map}>
        <div className={styles.mapTitle}>
          小区：<span>{community}</span>
        </div>
        <div className={styles.mapContainer} id="map"></div>
      </div>
    );
  };

  // 渲染房屋配套
  renderSupporting = () => {
    const {
      detail: { supporting },
    } = this.state;

    return (
      <div className={styles.about}>
        <div className={styles.houseTitle}>房屋配套</div>
        {supporting.length === 0 ? (
          <div>房屋配套</div>
        ) : (
          <HouseMatch data={supporting} />
        )}
      </div>
    );
  };

  initMap = () => {
    const {
      community,
      coord: { longitude, latitude },
    } = this.state.detail;

    var map = new BMapGL.Map("map");
    var point = new BMapGL.Point(longitude, latitude);
    map.centerAndZoom(point, 15);

    // 添加覆盖物
    var opts = {
      position: point,
      offset: new BMapGL.Size(-36, -66),
    };
    var label = new BMapGL.Label("", opts);
    label.setContent(`<div>
        <span>${community}</span>
        <div class="${styles.mapArrow}"></div>
    </div>`);
    label.setStyle(labelStyle);
    map.addOverlay(label); // 将标注添加到地图中
  };

  render() {
    const {
      detail: { supporting, community, houseImg },
    } = this.state;

    return (
      <div className={styles.root}>
        {community && (
          <MyNavBar
            title={community}
            rightContent={[<i key="0" className="iconfont icon-share" />]}
            className={styles.detailHeader}
          />
        )}

        {/* 渲染轮播图 */}
        {houseImg && this.renderSwiper()}

        {/* 渲染房屋信息 */}
        {this.renderHouseInfo()}

        {/* 渲染小区和地图 */}
        {this.renderMap()}

        {/* 渲染房屋配套 */}
        {supporting && this.renderSupporting()}
      </div>
    );
  }
}
