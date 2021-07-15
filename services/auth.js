const jwt = require('jsonwebtoken');

// Create token for this user
const createToken = async (user) => {
  // create token and set to expire in 2 hours
  // GUID generator for private key
  const token = await jwt.sign(
    { _id: user._id },
    process.env.PRIVATE_KEY_TOKEN,
    { expiresIn: '2h' }
  );
  return token;
};

module.exports = { createToken };
