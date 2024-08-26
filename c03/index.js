const express = require("express");

const connectDB = require("./db/config");
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("./handlers/accounts");
connectDB(); // nasata databaza se povrzala

const app = express();

app.use(express.json());
// POST, PUT - ke mozat da primat podatoci vo JSON body

app.get("/accounts", getAccounts);
app.post("/accounts", createAccount);
app.put("/accounts", updateAccount);
app.delete("/accounts", deleteAccount);

app.listen(3000, () => console.log("Server started!"));
