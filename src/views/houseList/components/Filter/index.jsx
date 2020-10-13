import React, { Component } from "react";
import { connect } from "react-redux";

class Filter extends Component {
  componentDidMount() {}

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
    addCount: function (count) {
      dispatch({ type: "ADD", payload: count });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
