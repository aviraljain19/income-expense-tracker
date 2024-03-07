const express = require("express");
const {
  userProfileCtrl,
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controller/users/usersCtrl");
const isLogin = require("../../middlewares/isLoggedIn");

const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);

usersRoute.post("/login", loginUserCtrl);

usersRoute.get("/profile", isLogin, userProfileCtrl);

usersRoute.delete("/", isLogin, deleteUserCtrl);

usersRoute.put("/", isLogin, updateUserCtrl);

module.exports = usersRoute;
