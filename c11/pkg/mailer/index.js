const fs = require("fs");

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { getSection } = require("../config");
const mailgun = new Mailgun(formData);

const mailTemplates = {
  PASSWORD_TEMPLATE: {
    title: "Your password reset link has been generated",
    template: "reset_password.html",
  },
  WELCOME: {
    title: "Welcome to our website",
    template: "welcome.html",
  },
};

// sendMail("h.vangel22@gmail.com", "WELCOME", { first_name: "Vangel", last_name: "Hristov", email: "h.vangel22@gmail.com" });
// sendMail("h.vangel22@gmail.com", "PASSWORD_TEMPLATE", { first_name: "Vangel", last_name: "Hristov", link: "http://test.com" });

const sendMail = async (to, type, data) => {
  const mg = mailgun.client({
    username: "api",
    key:
      getSection("development").api_key || // config.json ne go prikacuvajte
      "c28de28170eb1bb6954bc93b24005999", // ne go prikacuvajte vasiot kluc
  });

  const title = mailTemplates[type].title; // mailTemplates.WELCOME.titles
  const templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
  let content = await readTemplate(templatePath);

  //   const token = jwt.sign()

  for (let i in data) {
    // vo ciklusot vrtime niz objektot
    // i varijablata e klucot:
    // first_name
    // last_name
    // email

    // {{first_name}}
    // data[i] => Vangel

    let regex = new RegExp(`\{\{${i}\}\}`, "g");
    content = content.replace(regex, data[i]);
  }

  const options = {
    from: getSection("development").sender_email, // nasata mejl adresa za nekoj biznis, info@semos.com
    to: to,
    subject: title,
    html: content,
  };

  try {
    return await mg.messages.create(getSection("development").domain, options);
  } catch (err) {
    throw err;
  }
};

const readTemplate = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = {
  sendMail,
};
