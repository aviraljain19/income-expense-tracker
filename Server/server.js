require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/connectDB");
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionRoutes");
const globalErrHandler = require("./middlewares/globalErrHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/user", usersRoute);

app.use("/api/v1/account", accountsRoute);

app.use("/api/v1/transaction", transactionsRoute);

app.use(globalErrHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
