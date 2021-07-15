const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Hash and Set password of instance
UserSchema.methods.setPassword = async function (
  pass
) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(pass, salt);
};

// Get 'unhashed' password and check it with this instance's password
UserSchema.methods.checkPassword = async function (
  pass
) {
  return await bcrypt.compare(pass, this.password);
};

// Export Models
// User Model
const User = mongoose.model('user', UserSchema);

module.exports = { User };
