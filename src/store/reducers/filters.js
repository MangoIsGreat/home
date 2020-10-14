import {
  SET_FILTER_DATA,
  SET_OPEN_TYPE,
  SET_SELECT_TITLE_VALUE,
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
      return newState2;
    case SET_SELECT_TITLE_VALUE:
      const newState3 = JSON.parse(JSON.stringify(state));
      newState3.selectTitleValue = {
        ...newState3.selectTitleValue,
        ...action.payload,
      };
      return newState3;
    default:
      return state;
  }
};
