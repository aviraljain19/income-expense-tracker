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

usersRoute.delete("/:id", deleteUserCtrl);

usersRoute.put("/:id", updateUserCtrl);

module.exports = usersRoute;
