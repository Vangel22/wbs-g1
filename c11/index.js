const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB();

const { getSection } = require("./pkg/config");

const {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPasswordTemplate,
  resetPassword,
} = require("./handlers/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  "/api", // /api/auth/login
  // bidejki reset password ima vo nego dinamicni parametri koi nemozeme da gi dodademe vo unless
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/forgot-password",
    ],
  })
);

// Authorization routes
app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/auth/refresh", refreshToken);
app.get("/api/forgot-password", (req, res) => {
  // renderiranje na templejtot forgot-password.ejs
  res.render("forgot-password");
});
app.post("/api/auth/forgot-password", forgotPassword);
app.get("/reset-password/:id/:token", resetPasswordTemplate);
app.post("/reset-password/:id/:token", resetPassword);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`)
);
