const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const appErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");

const registerUserCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User already exist", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const loginUserCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Invalid credentials", 400));
    }
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(appErr("Invalid credentials", 400));
    }

    res.json({
      status: "Success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(appErr(error));
  }
};

const userProfileCtrl = async (req, res) => {
  try {
    res.json({ msg: "Profile Route" });
  } catch (error) {
    res.json(error);
  }
};

const deleteUserCtrl = async (req, res) => {
  try {
    res.json({ msg: "Delete Route" });
  } catch (error) {
    res.json(error);
  }
};

const updateUserCtrl = async (req, res) => {
  try {
    res.json({ msg: "Update user Route" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  userProfileCtrl,
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
