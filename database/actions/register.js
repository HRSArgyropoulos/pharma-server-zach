const { User } = require('../models/user');

// check whether email exists
const emailExists = async (email) => {
  return User.findOne({ email }).exec();
};

// create user
const saveUser = async (body) => {
  // create user instance
  const user = await new User(body);
  // save user in DB
  return await user.save();
};

module.exports = { emailExists, saveUser };
