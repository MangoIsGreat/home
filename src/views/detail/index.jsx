import React, { Component } from "react";
import styles from "./index.module.scss";
import MyNavBar from "../../components/MyNavBar";
import { Carousel } from "antd-mobile";
import { BASE_URL } from "../../utils/url";

export default class Detail extends Component {
  constructor() {
    super();

    this.state = {
      detail: {},
      imgHeight: 252
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
      this.setState({
        detail: result.data.body,
      });
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

  render() {
    const { detail } = this.state;
    return (
      <div className={styles.root}>
        {detail.community && (
          <MyNavBar
            title={detail.community}
            rightContent={[<i key="0" className="iconfont icon-share" />]}
            className={styles.detailHeader}
          />
        )}

        {/* 渲染轮播图 */}
        {detail.houseImg && this.renderSwiper()}
      </div>
    );
  }
}
