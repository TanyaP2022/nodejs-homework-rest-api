const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { API_KEY } = process.env;

sgMail.setApiKey(API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "test0123@meta.ua" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
