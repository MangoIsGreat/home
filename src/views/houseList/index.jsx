import React, {Component} from "react"
import { Flex } from "antd-mobile"
import SearchBar from "../../components/SearchBar"

import styles from "./index.module.scss"

export default class houseList extends Component {
    render() {
        return(
            <div className={styles.root}>
                <Flex className={styles.listHeader}>
                    <i className="iconfont icon-back" />
                    <SearchBar cityName="深圳" className={styles.mySearchBar} />
                </Flex>
            </div>
        )
    }
}