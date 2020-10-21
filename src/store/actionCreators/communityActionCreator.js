import { SET_COMMUNITY } from "../actionTypes/communityActionType";

/**
 * 同步的action
 * @param {*} data 
 */
export const setCommunity = (data) => {
  return {
    type: SET_COMMUNITY,
    payload: data,
  };
};
