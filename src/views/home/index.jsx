import React, {Component} from "react"

import styles from "./index.module.scss"

export default class Home extends Component {
    componentDidMount() {
        this.getSwipperData()
    }

    getSwipperData = () => {
        this.axios.get('/home/swiper').then(res => {
            console.log(res)
        })
    }

    render() {
        return(
            <div>Home</div>
        )
    }
}