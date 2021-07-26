const nodemailer = require('nodemailer');
const {
  smtpOptions,
} = require('../helpers/smtpOptions');

// create a reusable transporter object using the default SMTP transport
const transporter =
  nodemailer.createTransport(smtpOptions);

// Send email with defined tranport object
const sendEmail = async (emailOptions) => {
  return await transporter.sendMail(emailOptions);
};

// Send Verification E-mail
const sendVerificationEmail = async (user, origin) => {
  // create verification url and message
  let msg = `<p>Hello ${user.firstName} ${user.lastName}. Thanks for registering!</p>`;
  if (origin) {
    const url = `${origin}/auth/verify-email?token=${user.verificationToken}`;
    msg += `<p>Please click on the following link to verify your email address:</p>
    <p><a href="${url}">${url}</a></p>`;
  } else {
    msg += `<p>Please use the below token to verify your email address.</p>
    <p><code>${user.verificationToken}</code></p>`;
  }
  msg +=
    '<p>If you did not request this email, please ignore it.</p><p>Thank you.</p>';

  // create rest of the keys for send email
  const emailOptions = {
    from: 'verifypharmazach@gmail.com',
    to: user.email,
    subject: 'Pharma New Account - Email Verification',
    html: msg,
  };

  // send email
  await sendEmail(emailOptions);
};

module.exports = { sendVerificationEmail };
