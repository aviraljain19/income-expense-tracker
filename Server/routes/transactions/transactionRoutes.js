const express = require("express");
const {
  createTransactionCtrl,
  getTransactionCtrl,
  getSingleTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../controller/transactions/transactionsCtrl");

const transactionsRoute = express.Router();

transactionsRoute.post("/", createTransactionCtrl);

transactionsRoute.get("/", getTransactionCtrl);

transactionsRoute.get("/:id", getSingleTransactionCtrl);

transactionsRoute.delete("/:id", deleteTransactionCtrl);

transactionsRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionsRoute;
