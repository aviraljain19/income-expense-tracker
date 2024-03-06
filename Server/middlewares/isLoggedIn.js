const appErr = require("../utils/AppErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verigyToken");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = verifyToken(token);
  req.user = decodedUser.id;
  if (!decodedUser) {
    return next(appErr("Invalid/Expired Token, please login again", 401));
  }
  next();
};

module.exports = isLogin;
