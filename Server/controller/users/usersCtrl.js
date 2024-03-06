const bcrypt = require("bcryptjs");
const User = require("../../model/User");

const registerUserCtrl = async (req, res) => {
  const { fullname, password, email } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.json({ message: "User already exists" });
    if (!email || !password || !fullname) {
      return res.json({ message: "Please fill all the details" });
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
    res.json(error);
  }
};

const loginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please fill all the details" });
    }
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return res.json({ message: "Invaid credentials" });
    }

    res.json({
      status: "Success",
      fullname: userFound.fullname,
      id: userFound._id,
    });
  } catch (error) {
    res.json(error);
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
