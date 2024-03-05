require("dotenv").config();
const express = require("express");
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionRoutes");

const app = express();

app.use("/api/v1/user", usersRoute);

app.use("/api/v1/account", accountsRoute);

app.use("/api/v1/transaction", transactionsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
