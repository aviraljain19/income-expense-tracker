const express = require("express");
const {
  createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAllAccountCtrl,
} = require("../../controller/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLoggedIn");

const accountsRoute = express.Router();

accountsRoute.post("/", isLogin, createAccountCtrl);

accountsRoute.get("/:id", getAccountCtrl);

accountsRoute.delete("/:id", deleteAccountCtrl);

accountsRoute.put("/:id", updateAccountCtrl);

accountsRoute.get("/", getAllAccountCtrl);

module.exports = accountsRoute;
