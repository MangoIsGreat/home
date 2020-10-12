import React from "react";
import styles from "./index.module.scss";
import { BASE_URL } from "../../utils/url.js";

function HouseItem({ houseImg, title, tags, price, desc, houseCode }) {
  return (
    <div className={styles.house} key={houseCode}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={`${BASE_URL}${houseImg}`} alt="" />
      </div>
      <div className={styles.content}>
        {/* 标题 */}
        <h3 className={styles.title}>{title}</h3>
        {/* 描述 */}
        <div className={styles.desc}>{desc}</div>
        {/* 标签 */}
        <div>
          {tags.map((item, index) => {
            const tagName = `tag${(index + 1) % 3}`;
            return (
              <span
                key={index}
                className={[styles.tag, styles[tagName]].join(" ")}
              >
                {item}
              </span>
            );
          })}
        </div>
        {/* 价格 */}
        <div className={styles.price}>{price}</div>
      </div>
    </div>
  );
}

export default HouseItem;
