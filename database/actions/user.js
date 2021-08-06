const { User } = require('../models/user');

// check whether email exists
const emailExists = async (email) => {
  return User.findOne({ email }).exec();
};

// check whether the token exists for some user
const verifyEmailToken = async (token) => {
  const query = { verificationToken: token };
  return User.findOneAndUpdate(query, {
    verified: true,
  });
};

// create user
const saveUser = async (body) => {
  // create user instance (and hash password pre-save)
  const user = await new User(body);
  // save user in DB
  return await user.save();
};

// set user's password reset token
const setPasswordResetToken = async (user) => {
  // generate token
  const token = await user.generatePasswordResetToken();
  // update user password token in DB
  const query = { email: user.email };
  return User.findOneAndUpdate(
    query,
    {
      resetPasswordToken: token,
    },
    {
      /* return the new form of doc (after the update has been applied) */
      new: true,
    }
  );
};

// check reset password token exists
const checkPasswordResetToken = async (token) => {
  const query = { resetPasswordToken: token };
  // find the user with that token and reset to default
  // his password reset token
  return User.findOneAndUpdate(
    query,
    {
      resetPasswordToken: '',
    },
    {
      new: true, //return new updated form of doc
    }
  );
};

// update users password
const setNewPassword = async (email, newPassword) => {
  const query = { email };
  return User.findOneAndUpdate(query, {
    password: newPassword,
  });
};

// login the user
const loginUser = async (email, password) => {
  // check if email exists in DB and get document
  const userDoc = await emailExists(email);
  if (!userDoc)
    throw {
      statusCode: 401,
      errorMessage: 'Email or password is incorrect',
    };

  // check if password does not match this user's email
  if (!(await userDoc.checkPassword(password)))
    throw {
      statusCode: 401,
      errorMessage: 'Email or password is incorrect',
    };

  // check if user is verified
  if (!userDoc.verified)
    throw {
      statusCode: 400,
      errorMessage: 'User is not verified yet',
    };

  return userDoc;
};

module.exports = {
  emailExists,
  verifyEmailToken,
  saveUser,
  setPasswordResetToken,
  checkPasswordResetToken,
  setNewPassword,
  loginUser,
};
