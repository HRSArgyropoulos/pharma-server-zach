const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Export Models
// User Model
const User = mongoose.model('user', UserSchema);

module.exports = { User };
