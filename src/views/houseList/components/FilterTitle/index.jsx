import React, { Component } from "react";
import { Flex } from "antd-mobile";
import styles from "./index.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActionCreator from "../../../../store/actionCreators/filterActionCreator";
// import { setOpenType } from "../../../../store/actionCreators/filterActionCreator";

const types = [
  { name: "区域", type: "area" },
  { name: "方式", type: "mode" },
  { name: "租金", type: "price" },
  { name: "筛选", type: "more" },
];

class FilterTitle extends Component {
  render() {
    return (
      <Flex className={styles.root}>
        {types.map((item) => {
          return (
            <Flex.Item
              className={styles.dropdown}
              key={item.type}
              onClick={() => {
                this.props.setOpenType(item.type);
                this.props.setSelectTitleValue({ [item.type]: true });
              }}
            >
              {item.name}
              <i className="iconfont icon-arrow"></i>
            </Flex.Item>
          );
        })}
      </Flex>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  // 批量注册的方式:
  return bindActionCreators(filterActionCreator, dispatch);

  //   按需注册的方式:
  //   return {
  //     setMyOpenType: function (data) {
  //       dispatch(setOpenType(data));
  //     },
  //   };
};

export default connect(null, mapDispatchToProps)(FilterTitle);
