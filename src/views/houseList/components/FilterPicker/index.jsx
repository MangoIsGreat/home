import React, { Component } from "react";
import { connect } from "react-redux";

class FilterPicker extends Component {
  render() {
    return <div>FilterPicker</div>;
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
