import React, { Component } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: "衣柜",
    icon: "icon-wardrobe",
  },
  {
    id: 2,
    name: "洗衣机",
    icon: "icon-wash",
  },
  {
    id: 3,
    name: "空调",
    icon: "icon-air",
  },
  {
    id: 4,
    name: "天然气",
    icon: "icon-gas",
  },
  {
    id: 5,
    name: "冰箱",
    icon: "icon-ref",
  },
  {
    id: 6,
    name: "暖气",
    icon: "icon-Heat",
  },
  {
    id: 7,
    name: "电视",
    icon: "icon-vid",
  },
  {
    id: 8,
    name: "热水器",
    icon: "icon-heater",
  },
  {
    id: 9,
    name: "宽带",
    icon: "icon-broadband",
  },
  {
    id: 10,
    name: "沙发",
    icon: "icon-sofa",
  },
];

export default class HouseMatch extends Component {
  constructor(props) {
    super();

    let supporting = null;

    if (props.data) {
      supporting = HOUSE_PACKAGE.filter((item) =>
        props.data.includes(item.name)
      );
    }

    this.state = {
      supporting,
    };
  }

  render() {
    let { supporting } = this.state;

    return (
      <ul className={styles.root}>
        {supporting.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              <p>
                <i
                  className={classNames(`iconfont ${item.icon}`, styles.icon)}
                ></i>
              </p>
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }
}
