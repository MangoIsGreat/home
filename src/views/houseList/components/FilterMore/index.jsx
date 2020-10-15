import React, { Component } from "react";
import styles from "./index.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActionCreator from "../../../../store/actionCreators/filterActionCreator";
import FilterFooter from "../FilterFooter";

class FilterMore extends Component {
  renderItems = (data) => {
    return (
      <dd className={styles.dd}>
        {data.map((item) => {
          return (
            <span className={styles.tag} key={item.value}>
              {item.label}
            </span>
          );
        })}
      </dd>
    );
  };

  render() {
    const { roomType, oriented, floor, characteristic } = this.props;
    return (
      <div className={styles.root}>
        {/* 遮罩 */}
        <div
          onClick={() => this.props.setOpenType("")}
          className={styles.mask}
        ></div>
        {/* 内容区域 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            {this.renderItems(roomType)}
            <dt className={styles.dt}>朝向</dt>
            {this.renderItems(oriented)}
            <dt className={styles.dt}>楼层</dt>
            {this.renderItems(floor)}
            <dt className={styles.dt}>房屋亮点</dt>
            {this.renderItems(characteristic)}
          </dl>
        </div>
        <div className={styles.footer}>
          <FilterFooter
            cancelText="清楚"
            okClick={() => console.log(11111)}
            cancelClick={() => console.log(22222)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  filters: {
    filterData: { roomType, oriented, floor, characteristic },
  },
}) => {
  return {
    roomType,
    oriented,
    floor,
    characteristic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(filterActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMore);
