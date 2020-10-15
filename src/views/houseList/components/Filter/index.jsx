import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActionCreator from "../../../../store/actionCreators/filterActionCreator";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";
import { Spring } from "react-spring/renderprops";

import styles from "./index.module.scss";

class Filter extends Component {
  componentDidMount() {
    //   触发异步的action,然后在异步的action中请求数据
    this.props.asyncSetFilterData();
  }

  renderMask() {
    const openType = this.props.openType;

    // if (openType === "") return null;
    const isShow =
      openType === "area" || openType === "mode" || openType === "price";

    return (
      <Spring to={{ opacity: isShow ? 1 : 0 }} config={{duration: 250}}>
        {(props) => {
          if (props.opacity === 0) {
            return null;
          } else {
            return (
              <div
                style={props}
                onClick={() => this.props.setOpenType("")}
                className={styles.mask}
              ></div>
            );
          }
        }}
      </Spring>
    );
  }

  render() {
    const openType = this.props.openType;

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        {this.renderMask()}
        {/* 内容区域 */}
        <div className={styles.content}>
          <FilterTitle />
          {(openType === "area" ||
            openType === "mode" ||
            openType === "price") && <FilterPicker />}
          {openType === "more" && <FilterMore />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filters: { openType } }) => {
  return {
    openType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(filterActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
