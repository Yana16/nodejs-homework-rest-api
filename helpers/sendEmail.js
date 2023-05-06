const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_LOGIN, META_PASSWORD, META_HOST, META_PORT } = process.env;

const nodemailerConfig = {
  host: META_HOST,
  port: META_PORT,
  secure: true,
  auth: {
    user: META_LOGIN,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_LOGIN };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
