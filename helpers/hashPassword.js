const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  // generate salt
  const salt = bcrypt.genSaltSync(10);
  // generate hashed password
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

module.exports = { hashPassword };
