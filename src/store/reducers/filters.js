const initState = {
  count: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "ADD":
      state.count = state.count + action.payload;
      return state;
    default:
      return state;
  }
};
