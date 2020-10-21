import React, { Component } from "react";
import styles from "./index.module.scss";
import debounce from "lodash/debounce";
import { SearchBar } from "antd-mobile";
import { getCurrentCity } from "../../../utils/city";

export default class RentSearch extends Component {
  state = {
    keyword: "",
  };

  async componentDidMount() {
    const { value } = await getCurrentCity();

    this.id = value;
  }

  changeValue = (str) => {
    this.setState(
      {
        keyword: str,
      },
      () => {
        this.search();
      }
    );
  };

  search = debounce(async () => {
    const result = await this.axios.get("/area/community", {
      params: {
        id: this.id,
        name: this.state.keyword,
      },
    });
  }, 500);

  /**
  debounce = (fn, delay = 200) => {
    let timer = null;
    return function() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    };
  };

  search = this.debounce(async () => {
    console.log("-----search-----");

    const result = await this.axios.get("/area/community", {
      params: {
        id: this.id,
        name: this.state.keyword
      }
    });

    console.log(result.data);
  }, 500);
   */

  render() {
    const { keyword } = this.state;

    return (
      <div className={styles.root}>
        <SearchBar
          placeholder="请输入小区或地址"
          value={keyword}
          onChange={this.changeValue}
          onSubmit={this.search}
          onCancel={() => this.props.history.goBack()}
        />
      </div>
    );
  }
}
