import {
  SET_FILTER_DATA,
  SET_OPEN_TYPE,
  SET_SELECT_TITLE_VALUE,
  SET_VALUE,
} from "../actionTypes/filterActionType";

const initState = {
  openType: "", // 点击的哪个类型 area mode price more
  filterData: {}, // FilterPicker与FilterMore展示需要的数据
  selectTitleValue: {
    area: false, // 区域
    mode: false, // 方式
    price: false, // 租金
    more: false, // 筛选
  },
  selectValue: {
    area: ["area", "null"], // 区域
    mode: ["null"], // 方式
    price: ["null"], // 租金
    more: [], // 筛选
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      const newState1 = JSON.parse(JSON.stringify(state));
      newState1.filterData = action.payload;
      return newState1;

    case SET_OPEN_TYPE:
      const newState2 = JSON.parse(JSON.stringify(state));
      newState2.openType = action.payload;

      // 处理高亮状态
      Object.keys(newState2.selectTitleValue).forEach((type) => {
        if (type === "area") {
          newState2.selectTitleValue["area"] =
            newState2.selectValue["area"].length > 2;
        } else if (type === "mode" || type === "price") {
          newState2.selectTitleValue[type] =
            newState2.selectValue[type][0] !== "null";
        } else if (type === "more") {
          newState2.selectTitleValue["more"] =
            newState2.selectValue["more"].length > 0;
        }
      });

      return newState2;

    case SET_SELECT_TITLE_VALUE:
      const newState3 = JSON.parse(JSON.stringify(state));
      newState3.selectTitleValue = {
        ...newState3.selectTitleValue,
        ...action.payload,
      };
      return newState3;

    case SET_VALUE:
      const newState4 = JSON.parse(JSON.stringify(state));
      newState4.selectValue = { ...newState4.selectValue, ...action.payload };
      return newState4;

    default:
      return state;
  }
};
