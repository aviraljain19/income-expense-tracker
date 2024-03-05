const express = require("express");
const {
  userProfileCtrl,
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controller/users/usersCtrl");

const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);

usersRoute.post("/login", loginUserCtrl);

usersRoute.get("/profile/:id", userProfileCtrl);

usersRoute.delete("/:id", deleteUserCtrl);

usersRoute.put("/:id", updateUserCtrl);

module.exports = usersRoute;
