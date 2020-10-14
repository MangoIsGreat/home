import React, { Component } from "react";
import { connect } from "react-redux";
import { PickerView } from "antd-mobile";
import FilterFooter from "../FilterFooter";

class FilterPicker extends Component {
  render() {
    const { openType, area, subway, rentType, price } = this.props;
    let data = null;
    let cols = 3;
    switch (openType) {
      case "area":
        data = [area, subway];
        break;

      case "mode":
        cols = 1;
        data = rentType;
        break;

      case "price":
        cols = 1;
        data = price;
        break;

      default:
        break;
    }

    return (
      <div>
        <PickerView cols={cols} data={data} />
        <FilterFooter />
      </div>
    );
  }
}

const mapStateToProps = ({
  filters: {
    openType,
    filterData: { area, subway, rentType, price },
  },
}) => {
  // 赋值给FilterPicker组件的props
  return {
    openType,
    area,
    subway,
    rentType,
    price,
  };
};

export default connect(mapStateToProps, null)(FilterPicker);
