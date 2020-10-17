import React, { Component } from "react";
import styles from "./index.module.scss";

export default class Detail extends Component {
  constructor() {
    super();

    this.state = {
      detail: null,
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

  render() {
    return <div className={styles.root}>详情页</div>;
  }
}
