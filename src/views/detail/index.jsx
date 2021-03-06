import React, { Component } from "react";
import styles from "./index.module.scss";
import MyNavBar from "../../components/MyNavBar";
import HouseMatch from "../../components/HouseMatch";
import HouseItem from "../../components/HouseItem";
import { Carousel, Flex, Modal, Toast } from "antd-mobile";
import { BASE_URL } from "../../utils/url";
import { isLogin } from "../../utils/token";

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

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    houseCode: "5cc477061439630e5b467b0b",
    houseImg: "/newImg/7bk83o0cf.jpg",
    desc: "72.32㎡/南 北/低楼层",
    title: "安贞西里 3室1厅",
    price: 4500,
    tags: ["随时看房"],
  },
  {
    id: 2,
    houseCode: "5cc4a1dd1439630e5b502266",
    houseImg: "/newImg/7bk83o0cf.jpg",
    desc: "83㎡/南/高楼层",
    title: "天居园 2室1厅",
    price: 7200,
    tags: ["近地铁"],
  },
  {
    id: 3,
    houseCode: "5cc46a921439630e5b439611",
    houseImg: "/newImg/7bk83o0cf.jpg",
    desc: "52㎡/西南/低楼层",
    title: "角门甲4号院 1室1厅",
    price: 4300,
    tags: ["集中供暖"],
  },
];

export default class Detail extends Component {
  constructor() {
    super();

    this.state = {
      detail: {},
      imgHeight: 252,
      isFavorite: false, //是否收藏
    };
  }

  componentDidMount() {
    this.getDetailData();

    // 查看是否收藏
    this.getIsFavorite();
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

  async getIsFavorite() {
    const result = await this.axios.get(
      `/user/favorites/${this.props.match.params.id}`
    );

    if (result.data.status === 200) {
      this.setState({
        isFavorite: result.data.body.isFavorite,
      });
    }
  }

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

  /** 渲染房屋配套 */
  renderDescription() {
    return (
      <div className={styles.set}>
        <div className={styles.houseTitle}>房源概况</div>
        <div>
          <div className={styles.contact}>
            <div className={styles.user}>
              <img src="http://huangjiangjun.top:8088/img/avatar.png" />
              <div className={styles.useInfo}>
                <div>王女士</div>
                <div className={styles.userAuth}>
                  <i className="iconfont icon-auth"></i>
                  已认证房主
                </div>
              </div>
            </div>
            <span className={styles.userMsg}>发消息</span>
          </div>
          <div className={styles.descText}>
            【房源亮点】
            离小区200米就是家家乐超市，504米就是花莲超市，05公里莲塘一中，1.3公里就到维也纳购物广场。
            【交通出行】 出小区234米就是万坊桥头公交站：515路
            429米星港湾花园（新连武路口）公交站：127路；128路；河溪线；128路箭江闸线
            【小区介绍】
            小区建于2001年，70年产权商品房，客厅朝南通阳台，配套设施齐，交通便利。
          </div>
        </div>
      </div>
    );
  }

  // 渲染猜你喜欢
  renderRecommendHouses = () => {
    return (
      <div className={styles.recommend}>
        <div className={styles.houseTitle}>猜你喜欢</div>
        <div className={styles.items}>
          {recommendHouses.map((item) => {
            return <HouseItem key={item.houseCode} {...item} />;
          })}
        </div>
      </div>
    );
  };

  /**
   * 渲染底部
   */
  renderFooter = () => {
    const { isFavorite } = this.state;
    return (
      <Flex className={styles.fixedBottom}>
        <Flex.Item onClick={this.favoriteOrNot}>
          <img
            className={styles.favoriteImg}
            src={
              isFavorite
                ? `${BASE_URL}/img/star.png`
                : `${BASE_URL}/img/unstar.png`
            }
            alt=""
          />
          <span className={styles.favorite}>
            {isFavorite ? "已收藏" : "收藏"}
          </span>
        </Flex.Item>
        <Flex.Item>在线咨询</Flex.Item>
        <Flex.Item>
          <a href="tel:400-618-4000" className={styles.telephone}>
            电话预约
          </a>
        </Flex.Item>
      </Flex>
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

  favoriteOrNot = async () => {
    // 判断是否登录，没有登录，则弹出模态框
    if (!isLogin()) {
      Modal.alert("提示", "登录后才能收藏房源，是否去登录？", [
        { text: "取消", onPress: null },
        { text: "去登录", onPress: () => this.props.history.push("/login") },
      ]);

      return;
    }

    // 如果登录，继续往下执行
    const isFavorite = this.state.isFavorite;

    let result = null;
    if (isFavorite) {
      // 收藏状态，点击取消收藏
      result = await this.axios.delete(
        `/user/favorites/${this.props.match.params.id}`
      );
    } else {
      // 非收藏状态，点击收藏
      result = await this.axios.post(
        `/user/favorites/${this.props.match.params.id}`
      );
    }

    Toast.info(result.data.description, 1);
    this.setState({
      isFavorite: !isFavorite,
    });
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

        {/* 渲染房屋概况 */}
        {this.renderDescription()}

        {/* 渲染猜你喜欢 */}
        {this.renderRecommendHouses()}

        {/* 渲染底部 */}
        {this.renderFooter()}
      </div>
    );
  }
}
