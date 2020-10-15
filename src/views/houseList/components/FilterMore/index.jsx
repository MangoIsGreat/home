import React, { Component } from "react";
import styles from "./index.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActionCreator from "../../../../store/actionCreators/filterActionCreator";

class FilterMore extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 遮罩 */}
        <div className={styles.mask}></div>
        {/* 内容区域 */}
        <div className={styles.tags}></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(filterActionCreator, dispatch);
};

export default connect(null, mapDispatchToProps)(FilterMore);
