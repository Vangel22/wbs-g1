const fs = require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 10479616; // 1024 * 1024 = 1MB
const ALLOWED_FILETYPES = ["image/jpeg", "image/jpg", "image/png"];

const upload = async (req, res) => {
  //   console.log("files", req.files);

  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size!");
  }

  //   const testArray = [1,2,3,4];
  //   console.log(testArray.includes(0));

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed!");
  }

  const userDir = `user_${req.auth.id}`; // user_1234
  const userDirPath = `${__dirname}/../uploads/${userDir}`; // /uploads/user_1234

  // Vo slucaj prethodno korisnikot veke da ima prikacuvano sliki da ne se prebrise veke postoeckiot folder
  if (!fs.existsSync(userDirPath)) {
    // /uploads/user_1234 ako ova pateka postoi ne kreiraj folder
    fs.mkdirSync(userDirPath);
  }

  const newFileName = req.files.document.name.split("."); // slika.jpg
  // const newFileName = ["slika", "jpg"];

  const fileName = `${newFileName[0]}_${makeId(6)}.${newFileName[1]}`; // slika_tr23p4.jpg -> slikata za da ima unikatno ime
  const filePath = `${userDirPath}/${fileName}`; // /uploads/user_1234/slika_tr23p4.jpg

  // Segment koj ni ovozmozuva da go zacuvame fajlot vo nasiot server
  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    }
    return res.status(201).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`; // /uploads/user_66ccdd03fcac8e9afe7e7c4f
  const filePath = `${userDirPath}/${req.params.filename}`;
  console.log("file path", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found!");
  }

  res.download(filePath); // slika.jpg
};

module.exports = {
  upload,
  download,
};
