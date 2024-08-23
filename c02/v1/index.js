const express = require("express");

const app = express();

app.get("/cars", getCars);

app.listen(3000, () => console.log("Server started at port 3000!"));
