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
    next(appErr(error.message, 500));
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
    next(appErr(error.message, 500));
  }
};

const userProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transaction",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

const updateUserCtrl = async (req, res, next) => {
  try {
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) return next(appErr("Email is taken", 404));
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        staus: "success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      staus: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userProfileCtrl,
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
