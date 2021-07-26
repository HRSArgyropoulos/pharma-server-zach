const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verificationToken: String,
});

// Hashing password pre-save
// (p.s. do not use arrow function in cb as it wont correctly bind this)
UserSchema.pre('save', function (next) {
  const user = this;
  console.log(user);

  //Hash the password
  // generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password using salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // overwrite password with hashed password
      user.password = hash;
      next();
    });
  });

  // Generate email verification token
  user.verificationToken = crypto
    .randomBytes(8)
    .toString('hex');
});

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
