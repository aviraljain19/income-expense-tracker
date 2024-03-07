const Account = require("../../model/Account");
const User = require("../../model/User");
const appErr = require("../../utils/AppErr");

const createAccountCtrl = async (req, res, next) => {
  try {
    const { name, initialBalance, accountType, notes } = req.body;
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });
    userFound.accounts.push(account._id);
    userFound.hasCreatedAccount = true;
    await userFound.save();
    res.json({ status: "success", data: account });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getAccountCtrl = async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await Account.findById(id).populate("transaction");
    res.json({ status: "success", data: account });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const getAllAccountCtrl = async (req, res, next) => {
  try {
    const accounts = await Account.find()
      .populate("transaction")
      .populate("createdBy");
    res.json(accounts);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const deleteAccountCtrl = async (req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Success", data: null });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const updateAccountCtrl = async (req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", data: account });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAllAccountCtrl,
};
