import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActionCreator from "../../../../store/actionCreators/filterActionCreator";

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
  return bindActionCreators(filterActionCreator, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
