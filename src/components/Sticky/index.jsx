import React, { Component } from "react";
import styles from "./index.module.scss";

export default class Sticky extends Component {
  // 占位元素的ref
  placeholderRef = React.createRef();
  // 吸顶组件的ref
  contentRef = React.createRef();

  handleScroll = () => {
    //   拿到对应的dom节点
    const placeholderDom = this.placeholderRef.current;
    const contentDom = this.contentRef.current;

    // 判断 placeholderDom 距离顶部的距离
    const { top } = placeholderDom.getBoundingClientRect();

    if (top <= 0) {
      placeholderDom.style.height = "40px";
      contentDom.classList.add(styles.fixed);
    } else {
      placeholderDom.style.height = "0px";
      contentDom.classList.remove(styles.fixed);
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
        {/* 占位的元素 */}
        <div ref={this.placeholderRef}></div>
        {/* 要吸顶的子组件 */}
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    );
  }
}
