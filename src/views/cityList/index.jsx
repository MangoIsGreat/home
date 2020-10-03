import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";

export default class CityList extends Component {
  componentDidMount() {
    this.getCityData()
  }

  getCityData = async () => {
    const result = await this.axios.get("/area/city?level=1")

    this.dealWithCityData(result.data.body)
  }

  dealWithCityData = (cityData) => {
    const tempObj = {}

    cityData.forEach(city => {
      const letter = city.short.substr(0, 1)

      if (tempObj[letter]) {
        tempObj[letter].push(city)
      } else {
        tempObj[letter] = [city]
      }
    });

    const IndexObjectKeys = Object.keys(tempObj).sort()

    console.log(tempObj)
    console.log(IndexObjectKeys)
  }

  render() {
    return (
      <div>
        <MyNavBar title="城市选择" />
      </div>
    );
  }
}
