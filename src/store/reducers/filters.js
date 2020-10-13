import { SET_FILTER_DATA } from "../actionTypes/filterActionType";

const initState = {
  filterData: {}, // FilterPicker与FilterMore展示需要的数据
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      const newState1 = JSON.parse(JSON.stringify(state));
      newState1.filterData = action.payload
      return newState1
    default:
      return state;
  }
};
