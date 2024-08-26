const express = require("express");

const connectDB = require("./db/config");
connectDB(); // nasata databaza se povrzala

const app = express();

app.use(express.json());
// POST, PUT - ke mozat da primat podatoci vo JSON body

app.get("/accounts");
app.post("/accounts");
app.put("/accounts");
app.delete("/accounts");

app.listen(3000, () => console.log("Server started!"));
