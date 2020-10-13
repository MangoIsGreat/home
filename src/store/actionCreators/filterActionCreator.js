import { SET_FILTER_DATA } from "../actionTypes/filterActionType";

/**
 * 同步的action
 * @param {*} data
 */
export const setFilterData = (data) => {
  return {
    type: SET_FILTER_DATA,
    payload: data,
  };
};

export const asyncSetFilterData = () => {
  console.log("asyncSetFilterData");
};
