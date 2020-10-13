import React, { Component } from "react";
import { connect } from "react-redux";

class Filter extends Component {
  componentDidMount() {
    //   触发异步的action,然后在异步的action中请求数据
    this.props.asyncSetFilterData();
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    myCount: state.filters.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    asyncSetFilterData: function () {
      // 触发异步的action
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
