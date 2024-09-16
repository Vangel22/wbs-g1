const express = require("express");
require("dotenv").config();

const config = require("./pkg/config");
const { sendMessage } = require("./handlers/mailer");

const api = express();
api.use(express.json());

api.post("/api/v1/send-msg", sendMessage);

api.listen(config.getSection("development").port, (err) => {
  err
    ? console.log(err)
    : console.log(
        `Server started on port ${config.getSection("development").port}`
      );
});
