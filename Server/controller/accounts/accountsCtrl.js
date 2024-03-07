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
    next(appErr(error));
  }
};

const getAccountCtrl = async (req, res) => {
  try {
    res.json({ message: "Get single account route" });
  } catch (error) {
    res.json(error);
  }
};

const getAllAccountCtrl = async (req, res) => {
  try {
    const accounts = await Account.find()
      .populate("transaction")
      .populate("createdBy");
    res.json(accounts);
  } catch (error) {
    res.json(error);
  }
};

const deleteAccountCtrl = async (req, res) => {
  try {
    res.json({ message: "Delete account route" });
  } catch (error) {
    res.json(error);
  }
};

const updateAccountCtrl = async (req, res) => {
  try {
    res.json({ message: "Update account route" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAllAccountCtrl,
};
