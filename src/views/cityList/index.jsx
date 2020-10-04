import React, { Component } from "react";
import MyNavBar from "../../components/MyNavBar";
import { getCurrentCity } from "../../utils/city";

export default class CityList extends Component {
  constructor() {
    super();

    this.state = {
      cityListObj: null,
      cityIndexList: null,
    };
  }

  componentDidMount() {
    this.getCityData();
  }

  getCityData = async () => {
    const result = await this.axios.get("/area/city?level=1");

    this.dealWithCityData(result.data.body);
  };

  dealWithCityData = async (cityData) => {
    const tempObj = {};

    cityData.forEach((city) => {
      const letter = city.short.substr(0, 1);

      if (tempObj[letter]) {
        tempObj[letter].push(city);
      } else {
        tempObj[letter] = [city];
      }
    });

    const IndexObjectKeys = Object.keys(tempObj).sort();

    // 处理热门城市数据：
    const result = await this.axios.get("/area/hot");
    tempObj["hot"] = result.data.body;
    IndexObjectKeys.unshift("hot");

    // 处理定位城市数据：
    const currentCity = await getCurrentCity();
    tempObj["#"] = [currentCity];
    IndexObjectKeys.unshift("#");

    this.setState({
      cityListObj: tempObj,
      cityIndexList: IndexObjectKeys,
    });
  };

  render() {
    return (
      <div>
        <MyNavBar title="城市选择" />
      </div>
    );
  }
}
