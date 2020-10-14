import React from "react";
import { Flex } from "antd-mobile";
import styles from "./index.module.scss";
import classNames from "classnames";

function FilterFooter({ cancelText, okText, cancelClick, okClick }) {
  return (
    <Flex className={styles.root}>
      <span
        className={classNames(styles.btn, styles.cancel)}
        onClick={cancelClick}
      >
        {cancelText}
      </span>
      <span className={classNames(styles.btn, styles.ok)} onClick={okClick}>
        {okText}
      </span>
    </Flex>
  );
}

FilterFooter.defaultProps = {
  cancelText: "取消",
  okText: "确定",
};

export default FilterFooter;
