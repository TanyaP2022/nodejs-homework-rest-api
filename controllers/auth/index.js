const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateStatusSubscription = require("./updateStatusSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateStatusSubscription,
  updateAvatar,
};
