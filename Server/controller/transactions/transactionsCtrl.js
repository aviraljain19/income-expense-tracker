const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const appErr = require("../../utils/AppErr");

const createTransactionCtrl = async (req, res, next) => {
  try {
    const { category, name, amount, notes, transactionType, account } =
      req.body;
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(appErr("Account not found", 404));
    }
    const transaction = await Transaction.create({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createdBy: req.user,
    });
    accountFound.transaction.push(transaction._id);
    await accountFound.save();
    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.find();
    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getSingleTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const deleteTransactionCtrl = async (req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ status: "success", data: null });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const updateTransactionCtrl = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ status: "success", data: transaction });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createTransactionCtrl,
  getSingleTransactionCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
