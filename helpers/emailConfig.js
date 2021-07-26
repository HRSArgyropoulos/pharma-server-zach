const emailVerificationConfig = {
  from: 'verifypharmazach@gmail.com',
  subject: 'Pharma New Account - Email Verification',
  html: '<p>Hello,</p><p>Please click on the following link to verify your email address:</p><p><a href="{{url}}">{{url}}</a></p><p>If you did not request this email, please ignore it.</p><p>Thank you.</p>',
};

module.exports = { emailVerificationConfig };
