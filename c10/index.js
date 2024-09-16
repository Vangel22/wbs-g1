const express = require("express");

const { getSection } = require("./pkg/config");
const {
  sendWelcomeMail,
  sendPasswordResetMail,
} = require("./handlers/mailgun");
// sendWelcomeMail, sendPasswordResetMail

const app = express();
app.use(express.json());

app.post("/api/welcome", sendWelcomeMail);
app.post("/api/reset", sendPasswordResetMail);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`)
);
