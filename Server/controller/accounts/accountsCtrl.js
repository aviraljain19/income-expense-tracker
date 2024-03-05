const createAccountCtrl = async (req, res) => {
  try {
    res.json({ message: "Create account route" });
  } catch (error) {
    res.json(error);
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
    res.json({ message: "Get all acounts route" });
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
