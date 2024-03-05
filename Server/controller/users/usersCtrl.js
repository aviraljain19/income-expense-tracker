const registerUserCtrl = async (req, res) => {
  try {
    res.json({ msg: "Register Route" });
  } catch (error) {
    res.json(error);
  }
};

const loginUserCtrl = async (req, res) => {
  try {
    res.json({ msg: "Login Route" });
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
