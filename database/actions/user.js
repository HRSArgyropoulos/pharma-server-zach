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

module.exports = {
  emailExists,
  verifyEmailToken,
  saveUser,
};
