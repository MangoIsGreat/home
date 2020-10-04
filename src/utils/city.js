// 从本地缓存中获取“城市”数据：
const getCity = () => {
  return window.localStorage.getItem("my_city");
};

// 缓存“城市”数据到本地：
const setCity = (city) => {
  window.localStorage.setItem("my_city", JSON.stringify(city));
};

// 获取当前数据的方法：
const getCurrentCity = () => {
  const city = getCity();

  if (city) {
    return Promise.resolve(JSON.parse(city));
  } else {
  }
};

export { getCurrentCity };
