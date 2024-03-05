const createTransactionCtrl = async (req, res) => {
  try {
    res.json({ message: "Create Transaction route" });
  } catch (error) {
    res.json(error);
  }
};

const getTransactionCtrl = async (req, res) => {
  try {
    res.json({ message: "Get transaction route" });
  } catch (error) {
    res.json(error);
  }
};

const getSingleTransactionCtrl = async (req, res) => {
  try {
    res.json({ message: "Get single transaction route" });
  } catch (error) {
    res.json(error);
  }
};

const deleteTransactionCtrl = async (req, res) => {
  try {
    res.json({ message: "Delete transaction route" });
  } catch (error) {
    res.json(error);
  }
};

const updateTransactionCtrl = async (req, res) => {
  try {
    res.json({ message: "Update transaction route" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createTransactionCtrl,
  getSingleTransactionCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
