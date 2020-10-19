const HKZF_TOKEN = "hkzf_token";

// 保存token
const setToken = (token) => {
  window.localStorage.setItem(HKZF_TOKEN, token);
};

// 取出token
const getToken = () => {
  return window.localStorage.getItem(HKZF_TOKEN);
};

// 删除Token
const removeToken = () => {
  window.localStorage.removeItem(HKZF_TOKEN);
};

// 判断是否登录
const isLogin = () => {
  const token = getToken();

  if (token) {
    return true;
  } else {
    return false;
  }
};

export { setToken, getToken, removeToken, isLogin };
