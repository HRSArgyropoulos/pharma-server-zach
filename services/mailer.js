const nodemailer = require('nodemailer');
const {
  smtpOptions,
} = require('../helpers/smtpOptions');

// create a reusable transporter object using the default SMTP transport
const transporter =
  nodemailer.createTransport(smtpOptions);

// send mail with defined transport object
const sendMail = async (to, from, subject, html) => {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
