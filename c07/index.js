const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const connectDB = require("./pkg/db/config");
connectDB();

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./handlers/auth");
const { upload, download } = require("./handlers/storage");

const app = express();

app.use(express.json());
// req.body go ocekuvame vo JSON format
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset"], // Authorization vo isprakanje na baranje ne se bara da bide popolneto
  })
);
app.use(fileUpload());
// postaven middleware za spravuvanje so fajlovi

// Authorization routes
app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/refresh", refreshToken);
app.post("/auth/reset", resetPassword);

// Storage routes
app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);

// Homework
// app.delete("/api/storage/:filename", removeFile);
// app.get("/api/list", listFilesForUser)

app.listen(getSection("development").port, () =>
  console.log(`Server starter at port ${getSection("development").port}`)
);
