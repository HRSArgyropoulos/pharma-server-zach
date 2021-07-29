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
    from: '💊 Pharma App <verifypharmazach@gmail.com>',
    to: user.email,
    subject: 'Pharma New Account - Email Verification',
    html: msg,
  };

  // send email
  await sendEmail(emailOptions);
};

// Send Reset Password Token E-mail
const sendResetPasswordEmail = async (
  email,
  token,
  origin
) => {
  let msg = `<p>Hello. You have requested to reset your password for this e-mail address.</p>`;
  if (origin) {
    const url = `${origin}/auth/reset-password?token=${token}`;
    msg += `<p>Please click on the following link to change your password.</p>
    <p><a href="${url}">${url}</a></p>`;
  } else {
    msg += `<p>Please use the below token to change your password.</p>
    <p><code>${token}</code></p>`;
  }
  msg +=
    '<p>If you did not request this email, please ignore it.</p><p>Thank you.</p>';

  const emailOptions = {
    from: '💊 Pharma App <infopharmazach@gmail.com>',
    to: email,
    subject: 'Pharma - Reset Password',
    html: msg,
  };

  await sendEmail(emailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
