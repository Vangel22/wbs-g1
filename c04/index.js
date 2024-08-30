const express = require("express");
const { expressjwt: jwt } = require("express-jwt"); // :jwt e preimenuvanje

const connectDB = require("./pkg/db/config");
connectDB();

// const test = {
//   name: "Test ime",
// };

// const { name: ime } = test;

// console.log("ime", ime);

const { getSection } = require("./pkg/config");
const { login, register } = require("./handlers/auth");

const app = express();

app.use(express.json()); // PUT i POST -> req.body
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    // osven na ovie pateki, na drugite ke vi pobaram da imate jwt token za da pristapite do rutata
    path: ["/auth/login", "/auth/register"],
  })
);

app.get("/", (req, res) => res.send("Hello World"));
app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}!`)
);
